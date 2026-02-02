import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiSupabase,
  SiLaravel,
  SiFlutter,
  SiDart,
  SiExpress,
} from "react-icons/si";

export const METADATA = {
  author: "Andhika Presha Saputra",
  title: "Portfolio | Andhika Presha Saputra",
  description:
    "Andhika Presha Saputra is a Fullstack Developer building modern, responsive web and mobile applications.",
  siteUrl: "https://andhikapresha.vercel.app/",
  keywords: [
    "Andhika Presha Saputra",
    "Fullstack Developer",
    "Web Developer",
    "Mobile Developer",
    "Software Engineer",
    "Portfolio",
  ].join(", "),
  image: "/assets/profile/foto-andhika-porto.jpg",
};

export const HERO = {
  name: "Andhika Presha Saputra",
  firstName: "Andhika",
  lastName: "Presha Saputra",
  greeting: "Hi, I'm",
  typedStrings: [
    "A Fullstack Developer",
    "I build modern web interfaces",
    "I create responsive web applications",
    "I develop mobile apps",
  ],
  description:
    "I craft beautiful, performant web and mobile applications with modern technologies. Passionate about creating seamless user experiences.",
  profileImage: "/assets/profile/foto-andhika-porto.jpg",
  cvUrl: "/assets/documents/CV_Andhika_Presha_Saputra.pdf",
};

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  {
    name: "Email",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=contact.dhikaa@gmail.com&su=Hello%20from%20Portfolio",
    icon: FaEnvelope,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andhika-presha-saputra-23b0232b0/",
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    url: "https://github.com/Dhikaaapr",
    icon: FaGithub,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/dhikprs?igsh=bng5ZDk4djAxcGVr",
    icon: FaInstagram,
  },
];

export const ABOUT = {
  title: "About Me",
  description: [
    "I'm a passionate Fullstack Developer based in Indonesia, specializing in building modern web and mobile applications.",
    "I love crafting beautiful user interfaces and creating seamless user experiences. My expertise spans from frontend technologies like React and Next.js to backend frameworks like Laravel and Express.",
    "I'm currently pursuing my degree at Universitas Paramadina while working on exciting projects that combine my skills in web and mobile development.",
  ],
  stats: [
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "15+" },
    { label: "Years Coding", value: "3+" },
  ],
};

export const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    ],
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ],
  },
];

export const PROJECTS = [
  {
    name: "TaskHub",
    video: "/assets/projects/aplikasi_taskhub.mp4",
    description:
      "Aplikasi manajemen tugas real-time yang dibangun dengan Flutter dan Firebase. Memungkinkan pengguna untuk melacak, mengelola, dan berkolaborasi dalam berbagai tugas secara efisien.",
    gradient: ["#FF512F", "#DD2476"],
    url: "https://github.com/Dhikaaapr",
    tech: ["Flutter", "Firebase"],
    isMobile: true,
  },
  {
    name: "Mentalist - User App",
    image: "/assets/projects/chatbot_calmora.png",
    video: "/assets/projects/aplikasi_user.mp4",
    description:
      "Aplikasi mobile untuk pengguna mencari konselor dan tes kesehatan mental. Dilengkapi dengan fitur chat, booking, dan mood tracker.",
    gradient: ["#134E5E", "#71B280"],
    url: "https://github.com/Dhikaaapr",
    tech: ["Flutter", "Laravel", "MySQL", "Supabase"],
    isMobile: true,
  },
  {
    name: "Mentalist - Counselor App",
    image: "/assets/projects/council_calmora.png",
    video: "/assets/projects/aplikasi_counselor.mp4",
    description:
      "Aplikasi khusus konselor untuk mengelola sesi dan chat pasien. Dashboard lengkap untuk monitoring schedule dan riwayat konsultasi.",
    gradient: ["#5D26C1", "#a17fe0"],
    url: "https://github.com/Dhikaaapr",
    tech: ["Flutter", "Laravel", "MySQL", "Supabase"],
    isMobile: true,
  },
  {
    name: "Mentalist - Admin",
    video: "/assets/projects/aplikasi%20admin.mp4",
    description:
      "Aplikasi khusus admin untuk mengelola user, konselor, dan konten. Manajemen sistem yang terintegrasi penuh dalam genggaman.",
    gradient: ["#2C5364", "#203A43"],
    url: "https://github.com/Dhikaaapr",
    tech: ["Flutter", "Laravel", "MySQL", "Supabase"],
    isMobile: true,
  },
];

export const EXPERIENCES = [
  {
    company: "Universitas Paramadina",
    role: "Frontend Developer",
    period: "Sep 2024 - Jan 2025",
    description: [
      "Berkontribusi dalam pengembangan Calmora, platform digital kesehatan mental",
      "Melakukan slicing desain UI ke halaman website responsif",
      "Mengintegrasikan API chatbot khusus kesehatan mental",
    ],
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
  },
  {
    company: "HIMTI",
    role: "Anggota Human Education",
    period: "Jun 2022 - Des 2022",
    description: [
      "Aktif dalam perencanaan kegiatan edukatif untuk mahasiswa",
      "Berperan dalam realisasi program BRAHMA: IT FEAST READY dan Kobit Academy",
      "Membantu penyusunan kurikulum dan koordinasi pemateri",
    ],
    tech: ["Event Management", "Team Collaboration"],
  },
];

export const EDUCATION = {
  degree: {
    title: "Bachelor of Information Technology",
    university: "Universitas Paramadina",
    period: "Sep 2023 - Jan 2026",
    location: "Jakarta, Indonesia",
    gpa: "3.85",
    status: "Still Ongoing",
  },
  overview:
    "Focused on Software Engineering, Human-Computer Interaction (HCI), and Full-Stack Web Development. Specialized in building robust software systems and user-centered applications. Completed a capstone project involving full-stack web development using modern technologies and industry best practices.",
  achievements: [
    {
      title: "Data Classification and Summarization Using IBM Granite (2025)",
      description:
        "Mengikuti proyek pembelajaran yang berfokus pada pemanfaatan teknologi AI IBM Granite untuk melakukan klasifikasi data dan pembuatan ringkasan otomatis (summarization). Dalam proyek ini, saya mempelajari cara kerja model language AI dalam memahami, mengelompokkan, dan menyederhanakan informasi berbasis teks.",
    },
    {
      title: "Beasiswa PSR (Paramadina Social Responsibility) (2023)",
      description:
        "Program beasiswa yang diselenggarakan oleh Universitas Paramadina untuk memberikan akses pendidikan tinggi bagi mereka yang berhak tetapi memiliki keterbatasan ekonomi. Beasiswa ini ditujukan untuk jenjang S1 di Universitas Paramadina, dengan fokus pada warga sekitar kampus atau mereka yang direkomendasikan oleh mitra universitas.",
    },
  ],
};

export const CONTACT = {
  title: "Let's Work Together",
  subtitle: "Have a project in mind? Let's create something amazing together.",
  email: "contact.dhikaa@gmail.com",
  serviceId: "service_tc5mtr2",
  templateId: "template_ja9ervo",
  publicKey: "eg_PZe-SVDLgli38x",
};
