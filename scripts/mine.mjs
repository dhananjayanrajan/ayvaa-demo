import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const TONE_NAME = /[a-z0-9_]*(tone|intent|tint)[a-z0-9_]*/i
const MAX_BLOCK = 1600

function collect(entry, out) {
  const st = statSync(entry)
  if (st.isDirectory()) {
    for (const name of readdirSync(entry).sort()) {
      if (name.endsWith('.tsx') || name.endsWith('.ts')) out.push(join(entry, name))
      else if (!name.includes('.')) collect(join(entry, name), out)
    }
  } else {
    out.push(entry)
  }
  return out
}

function braceFrom(src, openIdx) {
  let depth = 0
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i]
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return src.slice(openIdx, i + 1)
    }
  }
  return src.slice(openIdx, openIdx + MAX_BLOCK)
}

function toneBlocks(src) {
  const out = []
  const re = /const\s+([A-Za-z0-9_]+)\s*(?::[^=\n]+)?=\s*\{/g
  let m
  while ((m = re.exec(src)) !== null) {
    if (!TONE_NAME.test(m[1])) continue
    const block = braceFrom(src, m.index + m[0].length - 1)
    out.push({ name: m[1], block })
  }
  return out
}

function propsMembers(src) {
  const out = []
  const re = /(?:export\s+)?interface\s+(\w*Props)\b[^{]*\{/g
  let m
  while ((m = re.exec(src)) !== null) {
    const block = braceFrom(src, m.index + m[0].length - 1)
    const members = block.split('\n')
      .map(s => s.trim())
      .filter(s => s && s !== '{' && s !== '}')
      .map(s => s.replace(/;$/, ''))
    out.push(members[0] === '' ? { name: m[1], members: members.slice(1) } : { name: m[1], members })
  }
  return out
}

function countAll(src, re, keyFn) {
  const map = new Map()
  let m
  while ((m = re.exec(src)) !== null) {
    const key = keyFn ? keyFn(m) : (m[1] !== undefined ? m[1] : m[0])
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return map
}

function mergeInto(dst, src) {
  for (const [k, n] of src) dst.set(k, (dst.get(k) ?? 0) + n)
}

function fmtMap(map, cap) {
  const rows = [...map.entries()]
    .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
    .slice(0, cap)
  return rows.map(([k, n]) => k + '×' + n).join('  ') || '(none)'
}

function mineFile(path) {
  const src = readFileSync(path, 'utf8')
  const lines = src.split('\n').length
  const imports = []
  let m
  const reImp = /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"](@\/[^'"]+)['"]/g
  while ((m = reImp.exec(src)) !== null) {
    imports.push(m[1].replace(/\s+/g, ' ').trim() + ' ← ' + m[2])
  }
  const exports = []
  const reExp = /export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class|type|interface)\s+(\w+)/g
  while ((m = reExp.exec(src)) !== null) exports.push(m[1])
  const reExpList = /export\s*\{([^}]+)\}/g
  while ((m = reExpList.exec(src)) !== null) {
    for (const part of m[1].split(',')) {
      const name = part.replace(/\s+as\s+.*$/, '').trim()
      if (name) exports.push(name)
    }
  }
  const fns = []
  if (path.includes('/data/')) {
    const reFn = /export\s+function\s+(\w+)\s*\(([^)]*)\)(?::\s*([^\n{]+))?/g
    while ((m = reFn.exec(src)) !== null) {
      const sig = m[1] + '(' + m[2].replace(/\s+/g, ' ').trim() + ')' + (m[3] ? ': ' + m[3].trim() : '')
      fns.push(sig.length > 110 ? sig.slice(0, 110) + '…' : sig)
    }
  }
  const states = []
  const reState = /useState(?:<[^>]*>)?\(([^)]*)\)/g
  while ((m = reState.exec(src)) !== null && states.length < 8) {
    const init = m[1].trim()
    if (init) states.push(init.length > 36 ? init.slice(0, 36) + '…' : init)
  }
  const effects = (src.match(/useEffect\(/g) ?? []).length
  const timers = (src.match(/\bsetTimeout\(/g) ?? []).length
  const machines = (src.match(/useMachine\(/g) ?? []).length + (src.match(/useActor(?:Ref)?\(/g) ?? []).length

  const f = {
    lines,
    imports,
    exports,
    fns,
    states,
    effects,
    timers,
    machines,
    toneBlocks: toneBlocks(src),
    props: propsMembers(src),
    pairs: countAll(src, /stiffness:\s*([\d.]+)\s*,\s*damping:\s*([\d.]+)/g, (mm) => mm[1] + '/' + mm[2]),
    stiffness: countAll(src, /stiffness:\s*([\d.]+)/g),
    damping: countAll(src, /damping:\s*([\d.]+)/g),
    durations: countAll(src, /duration:\s*([\d.]+)/g),
    eases: countAll(src, /ease:\s*'?([A-Za-z]+)'?/g),
    curves: countAll(src, /ease:\s*\[([^\]]+)\]/g),
    repeats: countAll(src, /repeat:\s*(Infinity|-1|\d+)/g),
    delays: countAll(src, /delay:\s*([\d.]+)/g),
    taps: countAll(src, /whileTap=\{\{\s*([^}]+?)\s*\}\}/g),
    hovers: countAll(src, /whileHover=\{\{\s*([^}]+?)\s*\}\}/g),
    rounded: countAll(src, /rounded-[a-z0-9[\]/.-]+/g),
    textPx: countAll(src, /text-\[\d+(?:\.\d+)?px\]/g),
    tracking: countAll(src, /tracking-\[[\d.]+em\]/g),
    spacing: countAll(src, /\b(?:p|px|py|pt|pb|pl|pr|mt|mb|ml|mr|mx|my|gap|gap-x|gap-y)-\d(?:\.\d)?\b/g),
    spacingArb: countAll(src, /\b(?:p|px|py|gap|mt|mb)-\[[\d.]+(?:px|rem)\]/g),
    opSlash: countAll(src, /\/(\d{1,2})\b/g),
    opBracket: countAll(src, /\/\[0\.(\d+)\]/g),
    weights: countAll(src, /font-(extrabold|bold|semibold|medium)/g),
    tabular: (src.match(/tabular-nums/g) ?? []).length,
  }
  return f
}

const domain = process.argv[2]
const inputs = process.argv.slice(3)
if (!domain || inputs.length === 0) {
  console.error('usage: node scripts/mine.mjs <domain> <path...>')
  process.exit(1)
}

const files = []
for (const input of inputs) collect(resolve(input), files)
if (files.length === 0) {
  console.error('no source files found for ' + domain)
  process.exit(1)
}

const out = []
out.push('# MINED — ' + domain)
out.push('')
out.push('auto-extracted from legacy corpus — requirements evidence only (R6). object-literal tone maps dumped raw; props surfaces as member lists; everything else summarized.')
out.push('')

const census = {
  pairs: new Map(), stiffness: new Map(), damping: new Map(),
  durations: new Map(), eases: new Map(), curves: new Map(),
  repeats: new Map(), delays: new Map(), taps: new Map(), hovers: new Map(),
  rounded: new Map(), textPx: new Map(), tracking: new Map(),
  spacing: new Map(), spacingArb: new Map(), opSlash: new Map(),
  opBracket: new Map(), weights: new Map(),
}
let totalLines = 0
let totalTabular = 0

for (const path of files) {
  const f = mineFile(path)
  totalLines += f.lines
  totalTabular += f.tabular
  out.push('### ' + path.replace(resolve('.') + '/', '') + ' (' + f.lines + ' lines)')
  if (f.imports.length) out.push('imports: ' + f.imports.slice(0, 12).join(' | '))
  out.push('exports: ' + (f.exports.join(', ') || '(none)'))
  if (f.fns.length) out.push('parsers: ' + f.fns.slice(0, 16).join(' ; '))
  out.push('state: ' + (f.states.join(' | ') || '(none)') + '   effects:' + f.effects + ' timers:' + f.timers + ' machines:' + f.machines)
  for (const p of f.props) out.push('props `' + p.name + '`: ' + p.members.join(' · '))
  for (const t of f.toneBlocks) {
    out.push('tone block `' + t.name + '`:')
    out.push('```tsx')
    out.push(t.block.length > MAX_BLOCK ? t.block.slice(0, MAX_BLOCK) + '\n…(truncated)' : t.block)
    out.push('```')
  }
  out.push('')
  for (const key of Object.keys(census)) mergeInto(census[key], f[key])
}

out.push('## domain census (' + files.length + ' files, ' + totalLines + ' lines)')
out.push('spring pairs: ' + fmtMap(census.pairs, 12))
out.push('stiffness singles: ' + fmtMap(census.stiffness, 8))
out.push('damping singles: ' + fmtMap(census.damping, 8))
out.push('durations: ' + fmtMap(census.durations, 12))
out.push('eases: ' + fmtMap(census.eases, 10))
out.push('curves: ' + fmtMap(census.curves, 8))
out.push('repeats: ' + fmtMap(census.repeats, 6))
out.push('delays: ' + fmtMap(census.delays, 6))
out.push('whileTap: ' + fmtMap(census.taps, 8))
out.push('whileHover: ' + fmtMap(census.hovers, 8))
out.push('rounded: ' + fmtMap(census.rounded, 14))
out.push('text-px: ' + fmtMap(census.textPx, 16))
out.push('tracking: ' + fmtMap(census.tracking, 8))
out.push('spacing: ' + fmtMap(census.spacing, 18))
out.push('spacing-arbitrary: ' + fmtMap(census.spacingArb, 10))
out.push('opacity /NN: ' + fmtMap(census.opSlash, 12))
out.push('opacity /[0.0N]: ' + fmtMap(census.opBracket, 12))
out.push('weights: ' + fmtMap(census.weights, 8))
out.push('tabular-nums total: ' + totalTabular)

const target = resolve('docs/mined/' + domain + '.md')
mkdirSync(resolve('docs/mined'), { recursive: true })
writeFileSync(target, out.join('\n') + '\n')
console.log(domain + ': ' + files.length + ' files, ' + totalLines + ' lines → ' + target)
