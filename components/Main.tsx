export default function Main({ children }: { children: React.ReactNode }) {
    return (
      <main >
        <div>
          {children}
        </div>
      </main>
    );
  }