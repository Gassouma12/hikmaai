import { useEffect, useRef, useState } from 'react'
import { uploadImage } from '../lib/supabase.js'

/**
 * Minimal contenteditable rich-text editor.
 *
 * Key tricks:
 * 1. `styleWithCSS` is enabled so formatting commands emit `<span style="...">`
 *    instead of deprecated `<font>` tags — modern CSS-styled spans actually win
 *    against the parent .rte-area font/color rules.
 * 2. The editor selection is saved every time it changes, and restored before
 *    every toolbar action — otherwise opening a <select> would steal focus and
 *    drop the selection, so font/color/size would have nothing to apply to.
 */

const FONTS = [
  { label: 'Serif (Libre Caslon)', value: "'Libre Caslon Text', Georgia, serif" },
  { label: 'Sans (Inter)',         value: "'Inter', system-ui, sans-serif" },
  { label: 'Mono',                 value: 'ui-monospace, SFMono-Regular, monospace' },
  { label: 'Georgia',              value: 'Georgia, serif' },
  { label: 'Helvetica',            value: 'Helvetica, Arial, sans-serif' },
]
const SIZES = [
  { label: 'Small',  value: '0.85em' },
  { label: 'Normal', value: '1em' },
  { label: 'Large',  value: '1.4em' },
  { label: 'Huge',   value: '1.9em' },
]
const COLORS = ['#1a1a1a', '#45433d', '#9a7a22', '#d4af37', '#b5642f', '#00696b', '#7a3b8f', '#bf3434']

export default function RichTextEditor({ value, onChange, placeholder = 'Write your article…' }) {
  const ref = useRef(null)
  const fileRef = useRef(null)
  const savedRange = useRef(null)
  const [uploading, setUploading] = useState(false)

  // Initial mount: load saved HTML once; flip to CSS-mode execCommand output.
  useEffect(() => {
    if (ref.current && value !== undefined && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
    try { document.execCommand('styleWithCSS', false, true) } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Capture the current selection range whenever it's inside the editor.
  const captureSelection = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return
    const r = sel.getRangeAt(0)
    if (ref.current?.contains(r.commonAncestorContainer)) {
      savedRange.current = r.cloneRange()
    }
  }
  // Restore the last in-editor selection, then put focus back so execCommand
  // has something to operate on.
  const restoreSelection = () => {
    ref.current?.focus()
    if (!savedRange.current) return
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(savedRange.current)
  }

  const exec = (cmd, val) => {
    restoreSelection()
    try { document.execCommand('styleWithCSS', false, true) } catch { /* ignore */ }
    document.execCommand(cmd, false, val)
    // After the command, capture the new selection so the next action keeps it.
    captureSelection()
    onChange?.(ref.current?.innerHTML || '')
  }

  // Apply a CSS property to the current selection. Used for font-family / size
  // so we can use modern CSS instead of execCommand's flaky fontName/fontSize.
  const applyStyle = (prop, value) => {
    restoreSelection()
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return
    const range = sel.getRangeAt(0)
    const span = document.createElement('span')
    span.style[prop] = value
    try {
      // surroundContents fails when the selection spans across boundaries.
      // In that case, fall back to extract + wrap + reinsert.
      range.surroundContents(span)
    } catch {
      const frag = range.extractContents()
      span.appendChild(frag)
      range.insertNode(span)
      // Re-select the wrapped content.
      const newRange = document.createRange()
      newRange.selectNodeContents(span)
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
    captureSelection()
    onChange?.(ref.current?.innerHTML || '')
  }

  const handleInput = () => { captureSelection(); onChange?.(ref.current?.innerHTML || '') }
  const handleKeyUp = () => captureSelection()
  const handleMouseUp = () => captureSelection()

  const insertLink = () => {
    const url = window.prompt('Link URL', 'https://')
    if (url) exec('createLink', url)
  }

  const insertImage = () => fileRef.current?.click()
  const onFile = async (e) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setUploading(true)
    try {
      const url = await uploadImage(f, 'inline')
      exec('insertImage', url)
    } catch (err) {
      alert(`Image upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
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
          <ToolSelect title="Block" onCapture={captureSelection} onChange={(v) => exec('formatBlock', v)}>
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote</option>
            <option value="pre">Code</option>
          </ToolSelect>
          <ToolSelect title="Font" onCapture={captureSelection} onChange={(v) => applyStyle('fontFamily', v)}>
            {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </ToolSelect>
          <ToolSelect title="Size" onCapture={captureSelection} onChange={(v) => applyStyle('fontSize', v)}>
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyStyle('color', c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </Group>

        <Group>
          <ToolBtn onClick={insertLink}  title="Insert link">🔗 Link</ToolBtn>
          <ToolBtn onClick={insertImage} title="Insert image" disabled={uploading}>
            {uploading ? '⏳ Uploading…' : '🖼 Image'}
          </ToolBtn>
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
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        onBlur={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  )
}

function Group({ children, className = '', ...rest }) {
  return <div className={`rte-group ${className}`} {...rest}>{children}</div>
}

function ToolBtn({ onClick, title, children, disabled }) {
  return (
    <button
      type="button"
      className="rte-btn"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function ToolSelect({ title, onChange, onCapture, children }) {
  return (
    <select
      className="rte-select"
      title={title}
      // Capture the editor's selection BEFORE the native dropdown opens and
      // steals focus.
      onMouseDown={() => onCapture?.()}
      onFocus={() => onCapture?.()}
      onChange={(e) => {
        const v = e.target.value
        if (v) onChange(v)
        e.target.selectedIndex = 0
      }}
      defaultValue=""
    >
      <option value="" disabled>{title}</option>
      {children}
    </select>
  )
}
