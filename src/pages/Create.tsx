
import Header from "@/components/Header";
import MemeEditor from "@/components/MemeEditor";

const Create = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-meme-purple/5">
      <Header />
      <main className="flex-grow py-6 md:py-10">
        <MemeEditor />
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        © 2025 Meme Magic Maker - Créé avec ❤️ et beaucoup de bons mèmes
      </footer>
    </div>
  );
};

export default Create;
