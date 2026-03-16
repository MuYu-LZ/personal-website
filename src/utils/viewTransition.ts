/**
 * View Transitions API helper.
 * Calls startViewTransition when available; otherwise runs the callback immediately.
 */

interface ViewTransitionOptions {
  duration?: number
  easing?: string
}

export function withViewTransition(callback: () => void, options?: ViewTransitionOptions) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const canUseVT =
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !prefersReducedMotion

  if (!canUseVT) {
    callback()
    return
  }

  try {
    // @ts-ignore - startViewTransition may not be typed yet
    const transition = (document as any).startViewTransition(callback)

    if (options && transition?.ready) {
      transition.ready.then(() => {
        if (options.duration) {
          document.documentElement.style.setProperty(
            '--hero-vt-duration',
            `${options.duration}ms`
          )
        }
        if (options.easing) {
          document.documentElement.style.setProperty('--hero-vt-ease', options.easing)
        }
      })
    }

    return transition
  } catch (error) {
    // Some environments throw when the page is hidden; fall back gracefully
    callback()
  }
}

/**
 * Check View Transitions API support.
 */
export function supportsViewTransition(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document
}
