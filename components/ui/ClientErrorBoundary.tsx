"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** Optional label for logging */
  name?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Catches client render errors (e.g. WebGL on older mobile GPUs)
 * so the rest of the page keeps working.
 */
export default class ClientErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[ClientErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`,
        error,
        info.componentStack
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
