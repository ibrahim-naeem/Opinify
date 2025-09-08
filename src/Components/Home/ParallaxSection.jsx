export default function ParallaxGlassSection() {
  const cards = [
    "Innovative Solutions",
    "Trusted Partnerships",
    "Cutting-Edge Tech",
    // "Customer First",
  ];

  return (
    <section
      className="w-[100vw] overflow-hidden relative h-[100vh] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div
        className={`relative grid gap-4 sm:gap-8 px-6 max-w-6xl w-full ${
          cards.length === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        <div className="p-4 sm:p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white text-center hover:scale-105 transition-transform duration-500">
          <h2 className="text-xl font-bold mb-2 sm:mb-4">
            A Community-Powered Anti-Scam Platform
          </h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Welcome to SCAMSNOOP , your trusted resource in the fight against
            online fraud. We provide a vital service for individuals and
            businesses to proactively protect themselves from financial scams.
          </p>
        </div>

        <div className="p-4 sm:p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white text-center hover:scale-105 transition-transform duration-500">
          <h2 className="text-xl font-bold mb-2 sm:mb-4">Our Mission</h2>
          <p className="text-sm leading-relaxed text-gray-200">
            To create a safer digital environment by empowering users with
            knowledge, fostering transparency, and holding scammers accountable
            through collective vigilance.
          </p>
        </div>

        <div className="p-4 sm:p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white text-center hover:scale-105 transition-transform duration-500">
          <h2 className="text-xl font-bold mb-2 sm:mb-4">Scammer Database</h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Access our continuously updated database of reported scammers.
            Search by username, instagram / facebook page whatsapp phone number,
            email, wallet address, or other identifying details to check if an
            entity has been flagged for fraudulent activity.
          </p>
        </div>
      </div>
    </section>
  );
}
