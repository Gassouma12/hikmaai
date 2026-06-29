import { useEffect, useRef } from 'react'

/**
 * Minimal contenteditable rich-text editor used by the admin article composer.
 * Uses document.execCommand — deprecated but still the simplest cross-browser
 * way to get formatting without a 100KB editor framework. Saves as HTML.
 *
 * Toolbar supports: bold, italic, underline, headings, lists, quote, colors,
 * fonts, font sizes, links, and image insertion (uploaded files become data
 * URLs — no backend needed for the demo).
 */

const FONTS = [
  { label: 'Serif (Libre Caslon)', value: "'Libre Caslon Text', Georgia, serif" },
  { label: 'Sans (Inter)',         value: "'Inter', system-ui, sans-serif" },
  { label: 'Mono',                 value: 'ui-monospace, SFMono-Regular, monospace' },
  { label: 'Georgia',              value: 'Georgia, serif' },
  { label: 'Helvetica',            value: 'Helvetica, Arial, sans-serif' },
]
const SIZES = [
  { label: 'Small',  value: '2' },
  { label: 'Normal', value: '3' },
  { label: 'Large',  value: '5' },
  { label: 'Huge',   value: '7' },
]
const COLORS = ['#1a1a1a', '#45433d', '#9a7a22', '#d4af37', '#b5642f', '#00696b', '#7a3b8f', '#bf3434']

export default function RichTextEditor({ value, onChange, placeholder = 'Write your article…' }) {
  const ref = useRef(null)
  const fileRef = useRef(null)

  // Initial mount: load saved HTML once. Don't re-sync from `value` afterward —
  // doing so would move the caret on every keystroke.
  useEffect(() => {
    if (ref.current && value !== undefined && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exec = (cmd, val) => {
    document.execCommand(cmd, false, val)
    ref.current?.focus()
    onChange?.(ref.current?.innerHTML || '')
  }
  const handleInput = () => onChange?.(ref.current?.innerHTML || '')

  const insertLink = () => {
    const url = window.prompt('Link URL', 'https://')
    if (url) exec('createLink', url)
  }

  const insertImage = () => fileRef.current?.click()
  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => exec('insertImage', reader.result)
    reader.readAsDataURL(f)
    e.target.value = ''
  }

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar">
        <Group>
          <ToolBtn onClick={() => exec('bold')} title="Bold (Ctrl+B)"><b>B</b></ToolBtn>
          <ToolBtn onClick={() => exec('italic')} title="Italic"><i>I</i></ToolBtn>
          <ToolBtn onClick={() => exec('underline')} title="Underline"><u>U</u></ToolBtn>
          <ToolBtn onClick={() => exec('strikeThrough')} title="Strikethrough"><s>S</s></ToolBtn>
        </Group>

        <Group>
          <ToolSelect title="Block" onChange={(v) => exec('formatBlock', v)}>
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote</option>
            <option value="pre">Code</option>
          </ToolSelect>
          <ToolSelect title="Font family" onChange={(v) => exec('fontName', v)}>
            {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </ToolSelect>
          <ToolSelect title="Size" onChange={(v) => exec('fontSize', v)}>
            {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </ToolSelect>
        </Group>

        <Group>
          <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bulleted list">• List</ToolBtn>
          <ToolBtn onClick={() => exec('insertOrderedList')} title="Numbered list">1. List</ToolBtn>
        </Group>

        <Group>
          <ToolBtn onClick={() => exec('justifyLeft')}   title="Left">⟸</ToolBtn>
          <ToolBtn onClick={() => exec('justifyCenter')} title="Center">≡</ToolBtn>
          <ToolBtn onClick={() => exec('justifyRight')}  title="Right">⟹</ToolBtn>
        </Group>

        <Group className="rte-colors" title="Text color">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className="rte-color"
              style={{ background: c }}
              onClick={() => exec('foreColor', c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </Group>

        <Group>
          <ToolBtn onClick={insertLink}  title="Insert link">🔗 Link</ToolBtn>
          <ToolBtn onClick={insertImage} title="Insert image">🖼 Image</ToolBtn>
          <ToolBtn onClick={() => exec('removeFormat')} title="Clear formatting">⌫ Clear</ToolBtn>
        </Group>

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
      </div>

      <div
        ref={ref}
        className="rte-area"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  )
}

function Group({ children, className = '', ...rest }) {
  return <div className={`rte-group ${className}`} {...rest}>{children}</div>
}
function ToolBtn({ onClick, title, children }) {
  return (
    <button type="button" className="rte-btn" onMouseDown={(e) => e.preventDefault()} onClick={onClick} title={title}>
      {children}
    </button>
  )
}
function ToolSelect({ title, onChange, children }) {
  return (
    <select
      className="rte-select"
      title={title}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => { const v = e.target.value; if (v) onChange(v); e.target.selectedIndex = 0 }}
      defaultValue=""
    >
      <option value="" disabled>{title}</option>
      {children}
    </select>
  )
}
