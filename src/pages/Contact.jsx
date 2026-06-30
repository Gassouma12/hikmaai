import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Paperclip, FileText, X, Send } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import Masthead from '../components/Masthead.jsx'
import Reveal from '../components/Reveal.jsx'
import StarMotif from '../components/StarMotif.jsx'
import StarDivider from '../components/StarDivider.jsx'
import { CONTACT } from '../data/content.js'
import { supabase } from '../lib/supabase.js'

async function uploadAttachment(file) {
  // Path: outreach/<timestamp>-<rand>-<originalName>
  const safe = file.name.replace(/[^\w.\- ]+/g, '_').slice(0, 80)
  const path = `outreach/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safe}`
  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    contentType: file.type || 'application/pdf',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return { name: file.name, size: file.size, url: data.publicUrl, path }
}

const fmtSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Contact() {
  const [purpose, setPurpose] = useState('partnership')
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendErr, setSendErr] = useState('')
  const fileInputRef = useRef(null)

  const addFiles = (list) => {
    const pdfs = Array.from(list).filter((f) => f.type === 'application/pdf')
    setFiles((prev) => {
      const seen = new Set(prev.map((f) => f.name + f.size))
      return [...prev, ...pdfs.filter((f) => !seen.has(f.name + f.size))]
    })
  }
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setSendErr('')
    const fd = new FormData(e.currentTarget)
    let uploaded = []
    try {
      uploaded = await Promise.all(files.map(uploadAttachment))
    } catch (err) {
      setSending(false)
      setSendErr(`Could not upload an attachment: ${err.message}`)
      return
    }
    const entry = {
      purpose,
      name: fd.get('name')?.toString().trim() || '',
      email: fd.get('email')?.toString().trim() || '',
      message: fd.get('message')?.toString().trim() || '',
      attachments: uploaded,
      read: false,
    }
    const { error } = await supabase.from('outreach').insert(entry)
    setSending(false)
    if (error) {
      setSendErr('Could not send right now. Please try again, or email us directly.')
      return
    }
    setSubmitted(true)
  }

  const reset = () => {
    setSubmitted(false)
    setFiles([])
    setPurpose('partnership')
  }

  return (
    <PageTransition>
      <div className="shell">
        <Masthead
          immediate
          index="✦"
          arabic={CONTACT.arabic}
          kicker={CONTACT.kicker}
          title={<>Start a <em>Conversation</em></>}
          lede={CONTACT.lede}
        />
      </div>

      <section className="section-tight shell">
        <div className="contact-layout">
          {/* storytelling aside */}
          <aside className="contact-aside">
            {CONTACT.tracks.map((t, i) => (
              <Reveal className="contact-track" key={t.tag} delay={i * 0.1}>
                <span className="contact-track-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="contact-track-tag">{t.tag}</h3>
                  <p className="contact-track-text">{t.text}</p>
                </div>
              </Reveal>
            ))}

            <div className="contact-aside-divider"><StarDivider /></div>

            <Reveal className="contact-detail" delay={0.2}>
              <span className="contact-detail-label">Prefer email?</span>
              <a className="contact-detail-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </Reveal>
          </aside>

          {/* form */}
          <div className="contact-form-wrap panel corner-ticks">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <StarMotif size={40} className="contact-success-star" stroke="var(--gold-bright)" strokeWidth={1} />
                  <h3 className="contact-success-title">{CONTACT.successTitle}</h3>
                  <p className="contact-success-text">{CONTACT.successText}</p>
                  <div className="contact-success-actions">
                    <button type="button" className="btn btn-secondary" onClick={reset}>Send another</button>
                    <Link to="/" className="btn btn-primary">Back to home</Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="field">
                    <span className="field-label">What brings you here?</span>
                    <div className="purpose-toggle" role="group" aria-label="Reason for contact">
                      <button
                        type="button"
                        className={purpose === 'partnership' ? 'is-active' : undefined}
                        onClick={() => setPurpose('partnership')}
                      >
                        Partnership
                      </button>
                      <button
                        type="button"
                        className={purpose === 'podcast' ? 'is-active' : undefined}
                        onClick={() => setPurpose('podcast')}
                      >
                        The Podcast
                      </button>
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="c-name">Your name</label>
                    <input id="c-name" name="name" type="text" required placeholder="How should we address you?" />
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="c-email">Email</label>
                    <input id="c-email" name="email" type="email" required placeholder="you@example.com" />
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="c-message">
                      {purpose === 'podcast' ? 'Tell us your story' : 'Your message'}
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={6}
                      required
                      placeholder={
                        purpose === 'podcast'
                          ? 'What would you want to talk about on The Hikma Dialogues?'
                          : 'What would you like to build with HIKMA?'
                      }
                    />
                  </div>

                  <div className="field">
                    <span className="field-label">Attachments <span className="field-hint">PDF only</span></span>
                    <div
                      className={`dropzone ${dragging ? 'is-dragging' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                    >
                      <Paperclip className="dropzone-icon" />
                      <span className="dropzone-text">
                        Drop your PDF here or <em>browse</em>
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        multiple
                        hidden
                        onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
                      />
                    </div>

                    {files.length > 0 && (
                      <ul className="file-list">
                        {files.map((f, i) => (
                          <li className="file-item" key={f.name + f.size}>
                            <FileText className="file-item-icon" />
                            <span className="file-item-name">{f.name}</span>
                            <span className="file-item-size">{fmtSize(f.size)}</span>
                            <button type="button" className="file-item-remove" aria-label={`Remove ${f.name}`} onClick={() => removeFile(i)}>
                              <X />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary contact-submit" disabled={sending}>
                    <Send className="contact-submit-icon" /> {sending ? 'Sending…' : 'Send Message'}
                  </button>
                  {sendErr && <p className="contact-form-note" style={{ color: 'var(--copper-light)' }}>{sendErr}</p>}
                  <p className="contact-form-note">{CONTACT.note}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
