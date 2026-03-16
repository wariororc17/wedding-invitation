import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Copy,
  ExternalLink,
  Gift,
  Image as ImageIcon,
  MapPin,
  MessageCircleHeart,
  Minus,
  Music2,
  Pause,
  Plus,
  QrCode,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const GALLERY = [
  "/gallery/photo 1.jpg",
  "/gallery/photo 2.jpg",
  "/gallery/photo 3.jpg",
  "/gallery/photo 4.jpg",
  "/gallery/photo 5.jpg",
  "/gallery/photo 6.jpg",
];

const STORY_IMAGES = [
  "/story/story-1.jpg",
  "/story/story-2.jpg",
  "/story/story-3.jpg",
  "/story/story-4.jpg",
];

const BRIDE_PHOTO = "/couple/bride.jpg";
const GROOM_PHOTO = "/couple/groom.jpg";
const HERO_COUPLE_PHOTO = "/couple/hero-couple.jpg";

const WEDDING_DATE_ISO = "2026-06-28T17:30:00+07:00";

const CONTENT = {
  en: {
    invitationLabel: "International Christian Wedding",
    openTo: "Dear",
    openButton: "Open Invitation",
    theWeddingOf: "The Wedding Of",
    heroText:
      "A luxury cinematic celebration of love, faith, and elegance — where two hearts become one before God and their loved ones.",
    detailsButton: "View Celebration",
    galleryButton: "View Gallery",
    verseLabel: "Bible Verse",
    verseText:
      '"And now these three remain: faith, hope and love. But the greatest of these is love."',
    verseRef: "1 Corinthians 13:13",
    countdownLabel: "Countdown To Forever",
    countdownTitle: "Counting Down To Our Special Day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    navStory: "Story",
    navEvent: "Event",
    navGallery: "Gallery",
    navGift: "Gift",
    navRsvp: "RSVP",
    storyLabel: "Our Journey",
    storyTitle: "A Love Story Written By Grace",
    stories: [
      {
        year: "2020",
        title: "The First Hello",
        text: "In the most unexpected moment, our paths crossed, and a simple hello slowly became something unforgettable.",
      },
      {
        year: "2022",
        title: "Growing In Love",
        text: "Through laughter, prayer, and every season of life, we learned to keep choosing each other with sincerity.",
      },
      {
        year: "2024",
        title: "A Promise Of Forever",
        text: "What began as a beautiful story turned into a certainty that home is wherever we are together.",
      },
      {
        year: "2026",
        title: "Our Covenant Begins",
        text: "By the grace of God, we are ready to begin a new chapter and celebrate our holy union in marriage.",
      },
    ],
    coupleLabel: "Meet The Couple",
    coupleTitle: "Jeremy & Yowanda",
    coupleText:
      "With gratitude to God and surrounded by the love of family and friends, we invite you to share in this unforgettable day with us.",
    bride: "Bride",
    groom: "Groom",
    daughterOf: "Beloved daughter of",
    sonOf: "Beloved son of",
    eventLabel: "Wedding Celebration",
    eventTitle: "Celebrate With Us",
    ceremony: "Holy Matrimony",
    reception: "Wedding Reception",
    dateLine: "Sunday, June 28th 2026",
    ceremonyTime: "5.30 PM",
    receptionTime: "7.00 PM - 10.00 PM",
    chapel: "St. Andrew's Chapel, Jakarta",
    ballroom: "The Grand Ballroom, Jakarta",
    mapButton: "Open Map",
    galleryLabel: "Prewedding Gallery",
    galleryTitle: "Frames Of Our Love",
    gallerySubtitle:
      "A collection of moments, glances, laughter, and stillness that brought us here.",
    giftLabel: "Wedding Gift",
    giftTitle: "Send Your Blessings",
    giftText:
      "Your prayers and presence are the greatest gift to us. However, if you wish to send a token of love, you may do so through the options below.",
    qrTitle: "QR Code",
    qrText: "Scan to send your gift",
    bankTitle: "Bank Transfer",
    bankSubtitle: "BCA Account",
    walletTitle: "E-Wallet",
    walletSubtitle: "OVO / GoPay / DANA / ShopeePay",
    copyAccount: "Copy Account",
    copyNumber: "Copy Number",
    copied: "Copied",
    rsvpLabel: "RSVP",
    rsvpTitle: "Confirm Your Attendance",
    rsvpText:
      "Please kindly confirm your presence so we can prepare the celebration with love and care.",
    attending: "Attending",
    maybe: "Maybe",
    notAttending: "Not Attending",
    attendingDesc: "I will be there to celebrate",
    maybeDesc: "Still confirming my schedule",
    notAttendingDesc: "Sending prayers from afar",
    fullName: "Full Name",
    whatsapp: "WhatsApp Number",
    guests: "Number of Guests",
    wishes: "Write your wishes and prayers",
    sendRsvp: "Send RSVP via WhatsApp",
    attendanceSummary: "Your selected attendance",
    closingLabel: "With Love & Gratitude",
    closingTitle: "See You On Our Beautiful Day",
    closingText:
      "Your presence, prayers, and warm wishes will become one of the most meaningful parts of our celebration. Thank you for being part of our love story.",
    footer: "Thank you for celebrating this special day with us.",
    musicOn: "Music On",
    musicOff: "Music Off",
    fallbackGuest: "Our Dearest Guest",
  },
  id: {
    invitationLabel: "Pernikahan Kristen Internasional",
    openTo: "Kepada",
    openButton: "Buka Undangan",
    theWeddingOf: "The Wedding Of",
    heroText:
      "Perayaan cinta yang mewah, sinematik, penuh iman, dan elegan — saat dua hati menjadi satu di hadapan Tuhan dan orang-orang terkasih.",
    detailsButton: "Lihat Perayaan",
    galleryButton: "Lihat Galeri",
    verseLabel: "Ayat Firman",
    verseText:
      '"Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih."',
    verseRef: "1 Korintus 13:13",
    countdownLabel: "Menuju Selamanya",
    countdownTitle: "Menghitung Mundur Hari Spesial Kami",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    navStory: "Kisah",
    navEvent: "Acara",
    navGallery: "Galeri",
    navGift: "Hadiah",
    navRsvp: "RSVP",
    storyLabel: "Perjalanan Kami",
    storyTitle: "Kisah Cinta Yang Ditulis Oleh Kasih Karunia",
    stories: [
      {
        year: "2020",
        title: "Sapaan Pertama",
        text: "Dalam momen yang paling tak terduga, jalan kami bertemu dan sebuah sapaan sederhana perlahan menjadi sesuatu yang tak terlupakan.",
      },
      {
        year: "2022",
        title: "Tumbuh Dalam Cinta",
        text: "Melalui tawa, doa, dan setiap musim kehidupan, kami belajar untuk terus saling memilih dengan tulus.",
      },
      {
        year: "2024",
        title: "Janji Selamanya",
        text: "Apa yang dimulai sebagai kisah indah berubah menjadi keyakinan bahwa rumah adalah saat kami bersama.",
      },
      {
        year: "2026",
        title: "Perjanjian Kami Dimulai",
        text: "Oleh kasih karunia Tuhan, kami siap memulai bab baru dan merayakan penyatuan kami dalam pernikahan kudus.",
      },
    ],
    coupleLabel: "Mempelai",
    coupleTitle: "Jeremy & Yowanda",
    coupleText:
      "Dengan syukur kepada Tuhan dan dikelilingi kasih keluarga serta sahabat, kami mengundang Anda untuk menjadi bagian dari hari yang tak terlupakan ini.",
    bride: "Mempelai Wanita",
    groom: "Mempelai Pria",
    daughterOf: "Putri tercinta dari",
    sonOf: "Putra tercinta dari",
    eventLabel: "Perayaan Pernikahan",
    eventTitle: "Rayakan Bersama Kami",
    ceremony: "Pemberkatan Nikah",
    reception: "Resepsi Pernikahan",
    dateLine: "Minggu, 28 Juni 2026",
    ceremonyTime: "17.30 WIB",
    receptionTime: "19.00 WIB - 22.00 WIB",
    chapel: "St. Andrew's Chapel, Jakarta",
    ballroom: "The Grand Ballroom, Jakarta",
    mapButton: "Buka Peta",
    galleryLabel: "Galeri Prewedding",
    galleryTitle: "Bingkai Cinta Kami",
    gallerySubtitle:
      "Kumpulan momen, tatapan, tawa, dan keheningan yang membawa kami sampai di hari ini.",
    giftLabel: "Wedding Gift",
    giftTitle: "Kirimkan Berkat Anda",
    giftText:
      "Doa dan kehadiran Anda adalah hadiah terindah bagi kami. Namun, apabila Anda ingin mengirimkan tanda kasih, dapat melalui opsi berikut.",
    qrTitle: "QR Code",
    qrText: "Scan untuk mengirim hadiah",
    bankTitle: "Transfer Bank",
    bankSubtitle: "Rekening BCA",
    walletTitle: "E-Wallet",
    walletSubtitle: "OVO / GoPay / DANA / ShopeePay",
    copyAccount: "Salin Rekening",
    copyNumber: "Salin Nomor",
    copied: "Tersalin",
    rsvpLabel: "RSVP",
    rsvpTitle: "Konfirmasi Kehadiran",
    rsvpText:
      "Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan perayaan dengan penuh kasih.",
    attending: "Hadir",
    maybe: "Mungkin",
    notAttending: "Tidak Hadir",
    attendingDesc: "Saya akan hadir merayakan",
    maybeDesc: "Masih menyesuaikan jadwal",
    notAttendingDesc: "Mengirimkan doa dari jauh",
    fullName: "Nama Lengkap",
    whatsapp: "Nomor WhatsApp",
    guests: "Jumlah Tamu",
    wishes: "Tulis ucapan dan doa terbaik",
    sendRsvp: "Kirim RSVP via WhatsApp",
    attendanceSummary: "Pilihan kehadiran Anda",
    closingLabel: "Dengan Cinta & Syukur",
    closingTitle: "Sampai Jumpa di Hari Bahagia Kami",
    closingText:
      "Kehadiran, doa, dan ucapan hangat Anda akan menjadi salah satu bagian paling berarti dalam perayaan kami. Terima kasih telah menjadi bagian dari kisah cinta kami.",
    footer: "Terima kasih telah merayakan hari istimewa ini bersama kami.",
    musicOn: "Musik On",
    musicOff: "Musik Off",
    fallbackGuest: "Tamu Undangan Terkasih",
  },
};

const PETALS = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 10,
  duration: 16 + Math.random() * 14,
  size: 10 + Math.random() * 16,
  drift: 18 + Math.random() * 40,
  rotate: Math.random() * 360,
  opacity: 0.12 + Math.random() * 0.24,
}));

const STARS = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 6,
  duration: 2.6 + Math.random() * 3.8,
  opacity: 0.2 + Math.random() * 0.45,
}));

const DUST_PARTICLES = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 60 + Math.random() * 120,
  delay: Math.random() * 10,
  duration: 14 + Math.random() * 12,
  opacity: 0.025 + Math.random() * 0.045,
}));

const SMALL_SPARKLES = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 8,
  duration: 3 + Math.random() * 4,
  opacity: 0.18 + Math.random() * 0.35,
}));

const RSVP_OPTIONS = {
  attending: { border: "border-emerald-400/30", bg: "bg-emerald-500/10" },
  maybe: { border: "border-amber-400/30", bg: "bg-amber-500/10" },
  notAttending: { border: "border-rose-400/30", bg: "bg-rose-500/10" },
};

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9 }}
      className="text-center"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase text-[#d6a1b7] md:text-xs"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.95, delay: 0.08 }}
        className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.14 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#ead9e0] md:text-base md:leading-8"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function ParallaxSection({ children, offset = 60, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <section ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [language, setLanguage] = useState("en");
  const [musicOn, setMusicOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");
  const [attendance, setAttendance] = useState("attending");
  const [guestCount, setGuestCount] = useState(2);
  const [form, setForm] = useState({ name: "", phone: "", wishes: "" });
  const audioRef = useRef(null);

  const t = CONTENT[language];
  const weddingDate = useMemo(() => new Date(WEDDING_DATE_ISO).getTime(), []);

  const guestName = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("to") || "";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = Math.max(weddingDate - now, 0);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    if (!copiedKey) return;
    const timer = setTimeout(() => setCopiedKey(""), 1800);
    return () => clearTimeout(timer);
  }, [copiedKey]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (musicOn) {
        audioRef.current.pause();
        setMusicOn(false);
      } else {
        await audioRef.current.play();
        setMusicOn(true);
      }
    } catch (error) {
      console.error("Audio playback failed", error);
    }
  };

  const openInvitation = async () => {
    setOpened(true);

    if (audioRef.current && !musicOn) {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch (error) {
        console.error("Autoplay blocked", error);
      }
    }
  };

  const copyText = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleSubmit = () => {
    const statusLabel =
      attendance === "attending"
        ? t.attending
        : attendance === "maybe"
          ? t.maybe
          : t.notAttending;

    const message =
      language === "en"
        ? `Hello Jeremy & Yowanda,%0A%0AName: ${form.name || "-"}%0AAttendance: ${statusLabel}%0AGuests: ${guestCount}%0AWhatsApp: ${form.phone || "-"}%0AWishes: ${form.wishes || "-"}`
        : `Halo Jeremy & Yowanda,%0A%0ANama: ${form.name || "-"}%0AKehadiran: ${statusLabel}%0AJumlah tamu: ${guestCount}%0AWhatsApp: ${form.phone || "-"}%0AUcapan: ${form.wishes || "-"}`;

    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06040a] text-[#f8edf3] selection:bg-[#b96a8f] selection:text-white">
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mp3" />
      </audio>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,20,55,0.32),transparent_22%),linear-gradient(180deg,#08030d_0%,#05020a_35%,#07030b_65%,#09040d_100%)]" />

        <motion.div
          className="absolute left-1/2 top-[12%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(255,180,215,0.22) 0%, rgba(188,78,130,0.14) 28%, rgba(84,27,76,0.08) 52%, transparent 75%)",
          }}
        />

        <motion.div
          className="absolute left-[-10%] top-[10%] h-[34rem] w-[34rem] rounded-full blur-3xl"
          animate={{ x: [0, 35, 0], y: [0, -20, 0], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(255,160,210,0.16) 0%, rgba(135,45,90,0.1) 40%, transparent 72%)",
          }}
        />

        <motion.div
          className="absolute right-[-8%] top-[18%] h-[30rem] w-[30rem] rounded-full blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, 18, 0], opacity: [0.1, 0.17, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(145,105,255,0.14) 0%, rgba(87,42,132,0.08) 42%, transparent 72%)",
          }}
        />

        <motion.div
          className="absolute bottom-[-10%] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(173,32,91,0.16) 0%, rgba(110,20,60,0.08) 42%, transparent 74%)",
          }}
        />

        {STARS.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            initial={{ opacity: 0.08, scale: 0.8 }}
            animate={{
              opacity: [0.08, star.opacity, 0.12, star.opacity * 0.7, 0.08],
              scale: [0.8, 1.15, 0.95, 1.2, 0.85],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow:
                "0 0 10px rgba(255,255,255,0.45), 0 0 18px rgba(244,196,220,0.18)",
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-[220%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-white/35 blur-[1px]" />
            <div className="absolute left-1/2 top-1/2 h-[1px] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-white/35 blur-[1px]" />
          </motion.div>
        ))}

        {SMALL_SPARKLES.map((spark) => (
          <motion.div
            key={`spark-${spark.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              boxShadow: "0 0 10px rgba(255,255,255,0.55)",
            }}
            animate={{ opacity: [0.05, spark.opacity, 0.08], scale: [0.8, 1.5, 0.9] }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {DUST_PARTICLES.map((dust) => (
          <motion.div
            key={`dust-${dust.id}`}
            className="absolute rounded-full blur-3xl"
            initial={{ opacity: dust.opacity }}
            animate={{
              x: [0, 18, -10, 0],
              y: [0, -24, 12, 0],
              opacity: [dust.opacity, dust.opacity * 1.8, dust.opacity],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: dust.duration,
              delay: dust.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: dust.left,
              top: dust.top,
              width: dust.size,
              height: dust.size,
              background:
                "radial-gradient(circle, rgba(255,235,245,0.8) 0%, rgba(255,210,230,0.28) 35%, transparent 72%)",
            }}
          />
        ))}

        {PETALS.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            initial={{ y: "-12vh", x: 0, rotate: petal.rotate, opacity: 0 }}
            animate={{
              y: "110vh",
              x: [0, petal.drift, -petal.drift * 0.55, petal.drift * 0.35, 0],
              rotate: [
                petal.rotate,
                petal.rotate + 120,
                petal.rotate + 220,
                petal.rotate + 320,
              ],
              opacity: [0, petal.opacity, petal.opacity * 0.9, petal.opacity * 0.7, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0"
            style={{ left: petal.left }}
          >
            <div
              className="relative"
              style={{ width: petal.size * 0.9, height: petal.size * 1.4 }}
            >
              <div className="absolute inset-0 rounded-[70%_30%_65%_35%/60%_35%_65%_40%] bg-gradient-to-b from-[#ffe6ef]/78 via-[#f2b7cc]/54 to-[#c86d93]/30 shadow-[0_0_10px_rgba(255,220,235,0.14)]" />
              <div className="absolute left-[16%] top-[10%] h-[36%] w-[22%] rounded-full bg-white/22 blur-[1px]" />
            </div>
          </motion.div>
        ))}

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.2)_78%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 sm:right-4 sm:top-4 md:right-6 md:top-6 md:gap-3">
        <div className="flex overflow-hidden rounded-full border border-white/15 bg-black/35 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => setLanguage("id")}
            className={`px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
              language === "id" ? "bg-white text-black" : "text-white hover:bg-white/10"
            }`}
          >
            ID
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
              language === "en" ? "bg-white text-black" : "text-white hover:bg-white/10"
            }`}
          >
            EN
          </button>
        </div>

        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-xl transition hover:bg-black/50 sm:px-4 sm:text-sm"
        >
          {musicOn ? <Pause size={14} /> : <Music2 size={14} />}
          {musicOn ? t.musicOff : t.musicOn}
        </button>
      </div>

      <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl md:flex md:items-center md:gap-1">
        {[
          ["#story", t.navStory],
          ["#event", t.navEvent],
          ["#gallery", t.navGallery],
          ["#gift", t.navGift],
          ["#rsvp", t.navRsvp],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>

 <AnimatePresence>
  {!opened && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9 } }}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#050308]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(176,32,64,0.22),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(120,15,35,0.2),transparent_36%),linear-gradient(180deg,#110106_0%,#060107_100%)]" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.14, 0.24, 0.14],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(190,30,60,0.28) 0%, rgba(120,10,35,0.18) 40%, transparent 72%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-4 w-full max-w-4xl"
      >
        <div className="relative mx-auto w-full max-w-[760px]">
          {/* shadow */}
          <div className="absolute inset-x-[8%] bottom-[-24px] h-16 rounded-full bg-black/50 blur-2xl" />

          {/* invitation card inside envelope */}
          <motion.div
            initial={{ y: 18, opacity: 0.92, scale: 0.985 }}
            animate={{
              y: [18, 10, 18],
              opacity: 1,
              scale: [0.985, 1, 0.985],
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[7%] z-0 w-[84%] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-[#f3d1dc]/15 bg-[linear-gradient(180deg,rgba(255,248,250,0.98),rgba(246,230,236,0.95))] px-6 py-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:py-10 md:px-12">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(120,30,50,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,30,50,0.25)_1px,transparent_1px)] bg-[size:26px_26px]" />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#8c4b60] sm:text-xs">
                  {t.invitationLabel}
                </p>

                <h1 className="mt-5 font-serif text-3xl text-[#5a1b2f] sm:text-5xl md:text-6xl">
                  Jeremy &amp; Yowanda
                </h1>

                <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-[#a5677f] sm:text-sm">
                  Save The Date
                </p>

                <div className="mx-auto mt-6 max-w-xl rounded-[1.2rem] border border-[#c995a8]/30 bg-white/55 px-4 py-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#a86f84] sm:text-xs">
                    {t.openTo}
                  </p>
                  <p className="mt-2 text-lg font-medium text-[#4f1928] sm:text-2xl">
                    {guestName || t.fallbackGuest}
                  </p>
                </div>

                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#714356] sm:text-base sm:leading-8">
                  {t.heroText}
                </p>

                <div className="mt-7 space-y-1 text-sm text-[#8d5b70] sm:text-base">
                  <p>{t.dateLine}</p>
                  <p>Jakarta, Indonesia</p>
                </div>

                <button
                  onClick={openInvitation}
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-[#bf728c] bg-[linear-gradient(180deg,#a72e53_0%,#7e1736_100%)] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(126,23,54,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 hover:scale-[1.02]"
                >
                  {t.openButton}
                </button>
              </div>
            </div>
          </motion.div>

          {/* envelope body */}
          <div className="relative h-[460px] sm:h-[520px] md:h-[560px]">
            {/* back envelope */}
            <div className="absolute inset-x-0 bottom-0 top-[16%] rounded-[1.8rem] border border-[#7e0f22]/70 bg-[linear-gradient(180deg,#7f0615_0%,#5f0410_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.6)]" />

            {/* inner luxury texture */}
            <div className="absolute inset-x-[2%] bottom-[2%] top-[18%] rounded-[1.6rem] border border-white/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_20%,transparent_80%,rgba(255,255,255,0.04))]" />

            {/* left fold */}
            <div
              className="absolute bottom-[2%] left-[2%] h-[58%] w-[48%] rounded-bl-[1.6rem] border-l border-b border-[#8b1025]/70 bg-[linear-gradient(135deg,#6e0413_0%,#780817_100%)]"
              style={{
                clipPath: "polygon(0 100%, 100% 24%, 100% 100%)",
              }}
            />

            {/* right fold */}
            <div
              className="absolute bottom-[2%] right-[2%] h-[58%] w-[48%] rounded-br-[1.6rem] border-r border-b border-[#8b1025]/70 bg-[linear-gradient(225deg,#6e0413_0%,#780817_100%)]"
              style={{
                clipPath: "polygon(0 24%, 100% 100%, 0 100%)",
              }}
            />

            {/* bottom fold */}
            <div
              className="absolute bottom-[2%] left-1/2 h-[46%] w-[64%] -translate-x-1/2 border-b border-[#a71b34]/55 bg-[linear-gradient(180deg,#881022_0%,#6f0918_100%)]"
              style={{
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* top flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top center", perspective: 1200 }}
              className="absolute inset-x-[2%] top-[2%] z-20 h-[56%]"
            >
              <div
                className="absolute inset-0 border border-[#931429]/70 bg-[linear-gradient(180deg,#7a0617_0%,#5f0410_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 82%)",
                }}
              />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 82%)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 28%, transparent 72%, rgba(255,255,255,0.04))",
                }}
              />
            </motion.div>

            {/* seal */}
            <div className="absolute left-1/2 top-[28%] z-30 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0.05)",
                    "0 0 18px rgba(255,220,220,0.12)",
                    "0 0 0 rgba(255,255,255,0.05)",
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-[#dcb6bf]/40 bg-[radial-gradient(circle,#7e0b20_0%,#5f0616_70%,#48030f_100%)] shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:h-24 sm:w-24"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f1dbe1]/70 text-[#f3e1e6] sm:h-16 sm:w-16">
                  <span className="font-serif text-2xl italic sm:text-3xl">JY</span>
                </div>
              </motion.div>
            </div>

            {/* subtle flower accent like example */}
            <div className="pointer-events-none absolute bottom-[-8px] left-[8%] z-30 hidden sm:block">
              <div className="relative h-32 w-36">
                <div className="absolute bottom-0 left-10 h-24 w-[3px] rotate-[22deg] rounded-full bg-gradient-to-b from-[#88a130] to-[#6f841f]" />
                <div className="absolute bottom-0 left-16 h-28 w-[3px] rotate-[28deg] rounded-full bg-gradient-to-b from-[#a8bc40] to-[#758c21]" />
                <div className="absolute bottom-16 left-0 h-12 w-8 rotate-[-25deg] rounded-[70%_30%_60%_40%/60%_35%_65%_40%] bg-[linear-gradient(180deg,rgba(166,142,255,0.55),rgba(116,80,175,0.22))] blur-[1px]" />
                <div className="absolute bottom-10 left-6 h-14 w-10 rotate-[8deg] rounded-[55%_45%_70%_30%/60%_30%_70%_40%] bg-[linear-gradient(180deg,rgba(144,123,255,0.45),rgba(87,60,158,0.18))] blur-[1px]" />
              </div>
            </div>

            {/* front text hint */}
            <div className="absolute bottom-[8%] left-1/2 z-10 -translate-x-1/2 text-center">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#f0cfd7]/65 sm:text-xs">
                Open The Invitation
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <ParallaxSection offset={35} className="relative z-10">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 text-center sm:px-6">
          <motion.div
            className="absolute left-1/2 top-[18%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-3xl sm:h-[26rem] sm:w-[26rem]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,220,235,0.15) 0%, rgba(214,120,160,0.07) 34%, transparent 72%)",
            }}
            animate={{
              y: [0, 14, 0],
              scale: [1, 1.04, 1],
              opacity: [0.16, 0.24, 0.16],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mx-auto w-full max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase text-[#d8a1b8] sm:text-xs sm:tracking-[0.55em]"
            >
              {t.theWeddingOf}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.08 }}
              className="mt-5 bg-gradient-to-b from-white via-[#f6dfe8] to-[#d6a6b8] bg-clip-text font-serif text-4xl text-transparent sm:text-6xl md:text-8xl lg:text-[7rem]"
            >
              Jeremy &amp; Yowanda
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.16 }}
              className="mx-auto mt-6 max-w-3xl px-2 text-sm leading-7 text-[#ebd7df] sm:text-base sm:leading-8 md:text-lg"
            >
              {t.heroText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.24 }}
              className="mx-auto mt-10 w-full max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-3">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,transparent_70%,rgba(255,255,255,0.06))]" />
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 sm:rounded-[2rem]">
                  <img
                    src={HERO_COUPLE_PHOTO}
                    alt="Jeremy and Yowanda"
                    className="h-[320px] w-full object-cover sm:h-[440px] md:h-[560px] lg:h-[640px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center sm:p-8">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#ecd6df] sm:text-xs sm:tracking-[0.45em]">
                      Forever Begins Here
                    </p>
                    <p className="mt-2 font-serif text-2xl text-white sm:text-4xl md:text-5xl">
                      28 June 2026
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <a
                href="#event"
                className="rounded-full border border-[#d285a6] bg-gradient-to-r from-[#7d2d53] to-[#a34a74] px-6 py-3 text-sm font-medium text-white shadow-2xl sm:px-7"
              >
                {t.detailsButton}
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl sm:px-7"
              >
                {t.galleryButton}
              </a>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 flex justify-center text-[#d9a8bc] sm:mt-16"
            >
              <ChevronDown size={28} />
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={30} className="relative z-10">
        <section className="px-4 pb-8 text-center sm:px-6">
          <div className="mx-auto max-w-3xl rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#d6a1b7] sm:tracking-[0.4em]">
              {t.verseLabel}
            </p>
            <p className="mt-5 font-serif text-xl leading-9 text-white sm:text-2xl sm:leading-10 md:text-3xl">
              {t.verseText}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[#d7a8bb] sm:text-sm sm:tracking-[0.28em]">
              {t.verseRef}
            </p>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={35} className="relative z-10">
        <section className="px-4 py-20 text-center sm:px-6 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-12">
            <SectionHeading eyebrow={t.countdownLabel} title={t.countdownTitle} />

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 md:gap-6">
              {[
                { label: t.days, value: timeLeft.days },
                { label: t.hours, value: timeLeft.hours },
                { label: t.minutes, value: timeLeft.minutes },
                { label: t.seconds, value: timeLeft.seconds },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="rounded-[1.2rem] border border-white/10 bg-black/25 p-5 shadow-xl backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
                >
                  <div className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#d7a8bb] sm:text-xs sm:tracking-[0.3em]">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={45} className="relative z-10">
        <section id="story" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.storyLabel} title={t.storyTitle} />

            <div className="mt-14 space-y-8 sm:mt-16 sm:space-y-10">
              {t.stories.map((story, i) => (
                <motion.div
                  key={story.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className={`grid items-center gap-6 rounded-[1.8rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:gap-8 sm:p-5 md:grid-cols-2 md:rounded-[2rem] md:p-6 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-[1.4rem] border border-white/10 sm:rounded-[1.5rem]">
                    <img
                      src={STORY_IMAGES[i] || STORY_IMAGES[0]}
                      alt={story.title}
                      className="h-[240px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[280px]"
                    />
                  </div>

                  <div className="px-1 sm:px-2 md:px-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#d9a9bc] sm:text-sm sm:tracking-[0.35em]">
                      {story.year}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
                      {story.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#ead9e0] sm:mt-5 sm:text-base sm:leading-8">
                      {story.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={40} className="relative z-10">
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={t.coupleLabel}
              title={t.coupleTitle}
              subtitle={t.coupleText}
            />

            <div className="mt-12 grid gap-6 sm:mt-14 sm:gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8"
              >
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-[#ba7896]/40 shadow-xl sm:h-40 sm:w-40">
                  <img
                    src={BRIDE_PHOTO}
                    alt="Yowanda"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-[#d5a2b6] sm:text-sm sm:tracking-[0.3em]">
                  {t.bride}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
                  Yowanda
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#ead9e0] sm:text-base sm:leading-8">
                  {t.daughterOf}
                  <br />
                  Bapak [Nama Ayah] &amp; Ibu [Nama Ibu]
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.08 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8"
              >
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-[#ba7896]/40 shadow-xl sm:h-40 sm:w-40">
                  <img
                    src={GROOM_PHOTO}
                    alt="Jeremy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-[#d5a2b6] sm:text-sm sm:tracking-[0.3em]">
                  {t.groom}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
                  Jeremy
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#ead9e0] sm:text-base sm:leading-8">
                  {t.sonOf}
                  <br />
                  Bapak [Nama Ayah] &amp; Ibu [Nama Ibu]
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={35} className="relative z-10">
        <section id="event" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-12">
            <SectionHeading eyebrow={t.eventLabel} title={t.eventTitle} />

            <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-8"
              >
                <div className="mb-4 flex items-center justify-center text-[#d4a1b5]">
                  <CalendarDays size={28} />
                </div>
                <h3 className="text-center font-serif text-2xl text-white sm:text-3xl">
                  {t.ceremony}
                </h3>
                <p className="mt-5 text-center text-sm leading-7 text-[#ead9e0] sm:text-base sm:leading-8">
                  {t.dateLine}
                  <br />
                  {t.ceremonyTime}
                </p>
                <div className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-[#d7b5c3] sm:text-base">
                  <MapPin size={16} className="mt-1 shrink-0" />
                  <span>{t.chapel}</span>
                </div>
                <div className="mt-8 flex justify-center">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    {t.mapButton}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-8"
              >
                <div className="mb-4 flex items-center justify-center text-[#d4a1b5]">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-center font-serif text-2xl text-white sm:text-3xl">
                  {t.reception}
                </h3>
                <p className="mt-5 text-center text-sm leading-7 text-[#ead9e0] sm:text-base sm:leading-8">
                  {t.dateLine}
                  <br />
                  {t.receptionTime}
                </p>
                <div className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-[#d7b5c3] sm:text-base">
                  <MapPin size={16} className="mt-1 shrink-0" />
                  <span>{t.ballroom}</span>
                </div>
                <div className="mt-8 flex justify-center">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    {t.mapButton}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={40} className="relative z-10">
        <section id="gallery" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={t.galleryLabel}
              title={t.galleryTitle}
              subtitle={t.gallerySubtitle}
            />

            <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
              {GALLERY.map((src, i) => (
                <motion.button
                  key={src}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelectedImage(src)}
                  className={`group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[2rem] ${
                    i === 1 || i === 4 ? "md:mt-12" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={src}
                      className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[420px]"
                      alt={`Prewedding ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-black/35 p-3 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
                      <ImageIcon size={18} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={30} className="relative z-10">
        <section id="gift" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-12">
            <SectionHeading
              eyebrow={t.giftLabel}
              title={t.giftTitle}
              subtitle={t.giftText}
            />

            <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 text-center backdrop-blur-xl sm:rounded-[1.8rem] sm:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f1d1dc]">
                  <QrCode size={24} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-white">{t.qrTitle}</h3>
                <p className="mt-3 text-sm text-[#e6cfd9]">{t.qrText}</p>
                <div className="mt-6 flex justify-center">
                  <img
                    src="/gift/qr-code.png"
                    alt="QR Code"
                    className="h-36 w-36 rounded-xl border border-white/10 bg-white object-cover sm:h-40 sm:w-40"
                  />
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 text-center backdrop-blur-xl sm:rounded-[1.8rem] sm:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f1d1dc]">
                  <Gift size={24} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-white">{t.bankTitle}</h3>
                <p className="mt-3 text-sm text-[#e6cfd9]">{t.bankSubtitle}</p>
                <div className="mt-6 space-y-2 text-[#ead9e0]">
                  <p className="text-lg font-medium">1234567890</p>
                  <p>a.n Jeremy</p>
                </div>
                <button
                  onClick={() => copyText("1234567890", "bca")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  <Copy size={14} />
                  {copiedKey === "bca" ? t.copied : t.copyAccount}
                </button>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 text-center backdrop-blur-xl sm:rounded-[1.8rem] sm:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f1d1dc]">
                  <Users size={24} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-white">{t.walletTitle}</h3>
                <p className="mt-3 text-sm text-[#e6cfd9]">{t.walletSubtitle}</p>
                <div className="mt-6 space-y-2 text-[#ead9e0]">
                  <p className="text-lg font-medium">0812-3456-7890</p>
                  <p>a.n Yowanda</p>
                </div>
                <button
                  onClick={() => copyText("081234567890", "wallet")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  <Copy size={14} />
                  {copiedKey === "wallet" ? t.copied : t.copyNumber}
                </button>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={25} className="relative z-10">
        <section id="rsvp" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-12">
            <SectionHeading
              eyebrow={t.rsvpLabel}
              title={t.rsvpTitle}
              subtitle={t.rsvpText}
            />

            <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {[
                ["attending", t.attending, t.attendingDesc],
                ["maybe", t.maybe, t.maybeDesc],
                ["notAttending", t.notAttending, t.notAttendingDesc],
              ].map(([key, title, desc]) => {
                const active = attendance === key;
                const style = RSVP_OPTIONS[key];

                return (
                  <button
                    key={key}
                    onClick={() => setAttendance(key)}
                    className={`rounded-[1.4rem] border p-5 text-center transition hover:scale-[1.02] sm:rounded-[1.6rem] sm:p-6 ${style.border} ${style.bg} ${
                      active ? "ring-2 ring-white/50" : ""
                    }`}
                  >
                    <h3 className="font-serif text-2xl text-white">{title}</h3>
                    <p className="mt-3 text-sm text-[#f3dfe6] sm:text-base">{desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm text-[#ead9e0]">{t.fullName}</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none placeholder:text-white/40"
                  placeholder={t.fullName}
                />

                <label className="block text-sm text-[#ead9e0]">{t.whatsapp}</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none placeholder:text-white/40"
                  placeholder={t.whatsapp}
                />

                <label className="block text-sm text-[#ead9e0]">{t.guests}</label>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <button
                    onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                    className="rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl text-white">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    className="rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm text-[#ead9e0]">{t.wishes}</label>
                <textarea
                  value={form.wishes}
                  onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                  className="min-h-[188px] w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none placeholder:text-white/40"
                  placeholder={t.wishes}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:flex-row md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#d6a1b7] sm:text-sm sm:tracking-[0.25em]">
                  {t.attendanceSummary}
                </p>
                <p className="mt-2 text-lg text-white sm:text-xl">
                  {attendance === "attending"
                    ? t.attending
                    : attendance === "maybe"
                      ? t.maybe
                      : t.notAttending}
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-full border border-[#d285a6] bg-gradient-to-r from-[#7d2d53] to-[#a34a74] px-7 py-3 text-sm font-medium text-white shadow-2xl"
              >
                <MessageCircleHeart size={16} />
                {t.sendRsvp}
              </button>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection offset={18} className="relative z-10">
        <section className="px-4 pb-24 pt-10 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8 md:p-12">
            <SectionHeading
              eyebrow={t.closingLabel}
              title={t.closingTitle}
              subtitle={t.closingText}
            />
          </div>
        </section>
      </ParallaxSection>

      <footer className="relative z-10 border-t border-white/10 px-4 py-10 text-center sm:px-6">
        <p className="bg-gradient-to-b from-white to-[#dba8bb] bg-clip-text font-serif text-3xl text-transparent md:text-4xl">
          Jeremy &amp; Yowanda
        </p>
        <p className="mt-3 text-sm text-[#e8d4dc] sm:text-base">{t.footer}</p>
      </footer>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-3 text-white sm:right-5 sm:top-5">
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0.6 }}
              src={selectedImage}
              alt="Gallery preview"
              className="max-h-[90vh] max-w-[92vw] rounded-3xl object-contain shadow-[0_20px_100px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}