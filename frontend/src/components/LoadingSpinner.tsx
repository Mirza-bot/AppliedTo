function LoadingSpinner() {
  interface Styles {
    loadingSpinnerContainer: React.CSSProperties;
    loadingSpinner: React.CSSProperties;
    spinAnimation: string;
  }

  const styles: Styles = {
    loadingSpinnerContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 5000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loadingSpinner: {
      width: "64px",
      height: "64px",
      border: "8px solid",
      borderColor: "#000 transparent #555 transparent",
      borderRadius: "50%",
      animation: "spin 1.2s linear infinite",
    },
    spinAnimation: `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  };

  return (
    <>
      <style>{styles.spinAnimation}</style>
      <div style={styles.loadingSpinnerContainer}>
        <div style={styles.loadingSpinner}></div>
      </div>
    </>
  );
}
export default LoadingSpinner;
