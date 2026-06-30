import { Component } from 'react'

/**
 * Tiny inline error boundary used inside the admin shell so a thrown error in
 * one tab doesn't leave a blank pane — it shows the actual message instead.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[admin tab crashed]', error, info?.componentStack)
  }
  render() {
    if (this.state.error) {
      return (
        <div className="admin-error">
          <h3>Something broke in this tab</h3>
          <pre>{String(this.state.error?.message || this.state.error)}</pre>
          <button className="admin-btn" onClick={() => this.setState({ error: null })}>Retry</button>
        </div>
      )
    }
    return this.props.children
  }
}
