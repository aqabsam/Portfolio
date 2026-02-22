export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export const defaultCertificates: Certificate[] = [
  {
    id: "cert-ml-webdev",
    title: "Machine Learning and Web Development",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
  },
  {
    id: "cert-c-programming",
    title: "C Programming",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
  },
  {
    id: "cert-state-level",
    title: "State Level Bootcamp",
    issuer: "Bihar DSTTE",
    date: "May 2025",
    link: "/BOOTCAMP.pdf",
  },
  {
    id: "cert-bootcamp",
    title: "Boot Camp",
    issuer: "IIT Bombay",
    date: "Apr 2025",
    link: "/BOOTCAMP.pdf",
  },
];
