import React, { Component, ErrorInfo, ReactNode } from "react";

import styles from "./_error_boundry.module.css";
interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

export const ErrorFallback = ({ error }: { error: Error }) => (
  <div className={styles["error-container"]}>
    <div className={styles.error}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="240"
          y="-31.53"
          width="32"
          height="575.06"
          transform="translate(-106.04 256) rotate(-45)"
        />
        <path d="M38.72,212.78C13.39,235.88,0,267.42,0,304c0,36,14.38,68.88,40.49,92.59C65.64,419.43,99.56,432,136,432H364.12L110.51,178.39C82.5,183.78,57.42,195.72,38.72,212.78Z" />
        <path d="M476.59,407.23C499.76,388.78,512,361.39,512,328c0-61.85-48.44-95.34-97.75-102.64-6.52-41.18-24.05-76.4-51.11-102.46A153.57,153.57,0,0,0,256,80c-30.47,0-58.9,8.62-83.07,25L475.75,407.86C476,407.65,476.32,407.45,476.59,407.23Z" />
      </svg>
    </div>
    <p>{error?.name}</p>
    <p>{error?.message}</p>
  </div>
);