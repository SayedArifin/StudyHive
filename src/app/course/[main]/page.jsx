"use client";

import { usePathname, useRouter } from "next/navigation";
import CourseDropdown from "../../../../components/Course";
import useSubsState from "../../../../components/ActiveSubscription";
import Loading from "../../loading";

const MainCourse = () => {
  const WebDevelopment = [
    {
      question: "HTML",
      answer:
        "HTML (Hypertext Markup Language) is the standard markup language for creating web pages and web applications. It provides the structure and semantic meaning to the content of a webpage.",
    },
    {
      question: "CSS",
      answer:
        "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation and visual styling of a document written in HTML. It allows you to control the layout, colors, fonts, and other visual aspects of a webpage.",
    },
    {
      question: "JavaScript",
      answer:
        "JavaScript is a programming language that enables dynamic and interactive behavior on websites. It is commonly used for client-side scripting, creating web applications, and adding interactivity to webpages.",
    },
    {
      question: "React",
      answer:
        "React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently manage the application state.",
    },
    {
      question: "Next.js",
      answer:
        "Next.js is a framework built on top of React that provides server-side rendering, automatic code splitting, and simplified routing for React applications. It helps in building optimized and scalable web applications.",
    },
    {
      question: "Node.js",
      answer:
        "Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server-side. It provides a platform for building scalable and efficient network applications.",
    },
    {
      question: "Express.js",
      answer:
        "Express.js is a minimal and flexible web application framework for Node.js. It provides a set of features for building web and mobile applications, including routing, middleware support, and template engines.",
    },
    {
      question: "Databases (SQL and NoSQL)",
      answer:
        "Databases are used to store and manage structured data. SQL databases (e.g., MySQL, PostgreSQL) use structured query language for data manipulation and retrieval. NoSQL databases (e.g., MongoDB, CouchDB) are non-relational and provide flexible data models for handling unstructured and semi-structured data.",
    },
    {
      question: "API Development",
      answer:
        "API (Application Programming Interface) development involves creating interfaces that allow different software applications to communicate and interact with each other. It includes designing, building, and documenting APIs to enable data exchange and integration between systems.",
    },
    {
      question: "Web Design Principles",
      answer:
        "Web design principles encompass various principles and guidelines for creating visually appealing and user-friendly websites. This includes aspects such as layout, color theory, typography, visual hierarchy, and usability considerations.",
    },
    {
      question: "User Experience (UX) Design",
      answer:
        "User Experience (UX) design focuses on enhancing user satisfaction by improving the usability, accessibility, and overall experience of a website or application. It involves conducting user research, creating user personas, wireframing, prototyping, and iterative design improvements.",
    },
    {
      question: "Progressive Web Apps (PWA)",
      answer:
        "Progressive Web Apps (PWAs) are web applications that leverage modern web technologies to provide an app-like experience to users. PWAs can be installed on a user's device, work offline, and have access to device features, providing a seamless experience across different platforms.",
    },
    {
      question: "Single Page Applications (SPA)",
      answer:
        "Single Page Applications (SPAs) are web applications that load a single HTML page and dynamically update the content as the user interacts with the application. SPAs provide a smooth and responsive user experience by reducing the need for full page reloads.",
    },
    {
      question: "Mobile App Development (using web technologies)",
      answer:
        "Mobile app development using web technologies involves creating mobile applications using web technologies like HTML, CSS, and JavaScript. Frameworks like React Native and Ionic enable building cross-platform mobile apps that can run on multiple platforms using web technologies.",
    },
    {
      question: "Web Accessibility",
      answer:
        "Web accessibility aims to ensure that websites and web applications are usable by people with disabilities. It involves designing and developing websites that can be navigated and understood by individuals with visual, auditory, motor, or cognitive impairments.",
    },
    {
      question: "Search Engine Optimization (SEO)",
      answer:
        "Search Engine Optimization (SEO) involves optimizing websites and web content to improve their visibility in search engine results. It includes techniques such as keyword research, on-page optimization, link building, and improving website performance to attract organic traffic from search engines.",
    },
    {
      question: "Web Performance Optimization",
      answer:
        "Web performance optimization focuses on improving the speed, responsiveness, and efficiency of websites and web applications. It involves techniques such as optimizing code, minimizing file sizes, leveraging caching, and optimizing network requests to deliver faster and smoother user experiences.",
    },
    {
      question: "Content Management Systems (CMS)",
      answer:
        "Content Management Systems (CMS) are software platforms that facilitate the creation, management, and modification of digital content. They provide an interface for non-technical users to publish content on the web without requiring deep knowledge of web development.",
    },
    {
      question: "Web Security",
      answer:
        "Web security involves protecting websites and web applications from various security threats, such as unauthorized access, data breaches, cross-site scripting (XSS), SQL injections, and more. It includes implementing security best practices, encryption, authentication mechanisms, and regular security audits.",
    },
    {
      question: "RESTful APIs",
      answer:
        "RESTful APIs (Representational State Transfer) are architectural principles for designing networked applications. They provide a standardized approach for building scalable and interoperable web services that can be consumed by various clients, such as web browsers, mobile apps, and other servers.",
    },
    {
      question: "Serverless Architecture",
      answer:
        "Serverless architecture is an approach to application development and deployment where the infrastructure management and scalability aspects are abstracted away. It allows developers to focus on writing code without worrying about server provisioning, scaling, and maintenance.",
    },
    {
      question: "Microservices",
      answer:
        "Microservices architecture is an architectural style that structures an application as a collection of small, loosely coupled services. Each service runs in its own process and communicates with other services via APIs. It enables scalability, agility, and easier maintenance of complex applications.",
    },
    {
      question: "Web Scraping",
      answer:
        "Web scraping is the process of extracting data from websites automatically. It involves writing code to fetch web pages, parse the HTML, and extract relevant information. Web scraping is commonly used for data mining, research, and automation.",
    },
    {
      question: "Web Analytics",
      answer:
        "Web analytics involves collecting, measuring, analyzing, and reporting data about website usage and user behavior. It provides insights into website performance, user engagement, traffic sources, conversion rates, and other key metrics, helping to optimize marketing and business strategies.",
    },
    {
      question: "Payment Gateway Integration",
      answer:
        "Payment gateway integration enables websites and applications to accept online payments securely. It involves integrating with payment service providers to handle payment transactions, process payments from customers, and ensure secure transmission of sensitive payment information.",
    },
    {
      question: "Authentication and Authorization",
      answer:
        "Authentication and authorization are mechanisms for verifying the identity of users and controlling their access to resources within a web application. Authentication ensures that users are who they claim to be, while authorization determines the actions and resources a user is allowed to access.",
    },
    {
      question: "Cross-platform Development",
      answer:
        "Cross-platform development involves creating applications that can run on multiple platforms, such as web, mobile, and desktop. Frameworks like React Native, Flutter, and Electron enable developers to write code once and deploy it across different platforms, saving time and effort.",
    },
    {
      question: "Web Deployment and DevOps",
      answer:
        "Web deployment and DevOps encompass the processes and practices involved in deploying web applications and managing the development lifecycle. It includes tasks like setting up servers, configuring environments, continuous integration and deployment, version control, and monitoring.",
    },
    {
      question: "Cloud Computing for Web Development",
      answer:
        "Cloud computing for web development involves hosting and running web applications on cloud platforms like Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform. It provides scalability, flexibility, and reliability by leveraging cloud infrastructure and services.",
    },
    {
      question: "Deployment",
      answer:
        "Deployment in web development refers to the process of making a website or web application available for public access. It involves tasks such as configuring servers, uploading files, setting up databases, and ensuring the proper functioning of the website or application in a live environment.",
    },
  ];

  const Coding = [
    {
      question: "Python",
      answer:
        "Python is a high-level programming language known for its simplicity and readability. It has a large standard library and a thriving ecosystem of third-party packages, making it suitable for a wide range of applications, including web development, data analysis, machine learning, and automation.",
    },
    {
      question: "Java",
      answer:
        "Java is a popular programming language known for its platform independence. It is widely used for developing enterprise-level applications, Android apps, and large-scale systems. Java offers strong support for object-oriented programming, automatic memory management, and a vast collection of libraries and frameworks.",
    },
    {
      question: "C++",
      answer:
        "C++ is a general-purpose programming language that provides high performance and low-level control. It is commonly used for developing system software, game engines, embedded systems, and performance-critical applications. C++ supports both procedural and object-oriented programming paradigms.",
    },
    {
      question: "C#",
      answer:
        "C# (pronounced C-sharp) is a modern, general-purpose programming language developed by Microsoft. It is primarily used for developing Windows desktop applications, web applications with ASP.NET, and games with Unity. C# combines the power of C++ with the simplicity of a high-level language.",
    },
    {
      question: "JavaScript",
      answer:
        "JavaScript is a versatile scripting language that is primarily used for web development. It allows you to add interactivity, dynamic content, and behavior to websites. JavaScript can be run on both the client-side (in the browser) and the server-side (with Node.js), making it a key component of modern web applications.",
    },
    {
      question: "Ruby",
      answer:
        "Ruby is a dynamic, object-oriented programming language known for its simplicity and productivity. It has an elegant syntax that focuses on developer happiness and is often used for web development with the Ruby on Rails framework. Ruby emphasizes convention over configuration and promotes clean, readable code.",
    },
    {
      question: "PHP",
      answer:
        "PHP is a server-side scripting language designed for web development. It is widely used for creating dynamic websites and web applications. PHP integrates seamlessly with HTML, has a large standard library, and supports various frameworks like Laravel and Symfony.",
    },
    {
      question: "Swift",
      answer:
        "Swift is a powerful and intuitive programming language developed by Apple. It is the primary language for developing iOS, macOS, watchOS, and tvOS applications. Swift combines the performance of compiled languages with the simplicity and expressiveness of modern scripting languages.",
    },
    {
      question: "Go",
      answer:
        "Go, also known as Golang, is a statically typed, compiled programming language developed by Google. It is designed for efficiency, simplicity, and concurrency. Go is often used for building scalable network applications, system utilities, and distributed systems.",
    },
  ];

  const DigitalMarketing = [
    {
      question: "Search Engine Optimization (SEO)",
      answer:
        "Search Engine Optimization (SEO) is the practice of optimizing a website to improve its visibility and rankings in search engine results pages. It involves various techniques such as keyword research, on-page optimization, technical optimization, link building, and content optimization to attract organic (non-paid) traffic from search engines.",
    },
    {
      question: "Digital Media Marketing",
      answer:
        "Digital Media Marketing involves promoting products, services, or brands on Digital media platforms like Facebook, Instagram, Twitter, LinkedIn, and YouTube. It includes creating engaging content, running targeted advertising campaigns, managing Digital media profiles, and analyzing performance to reach and engage with a specific target audience.",
    },
    {
      question: "Content Marketing",
      answer:
        "Content Marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience. It involves creating blog posts, articles, videos, infographics, and other forms of content to educate, entertain, and engage with the target audience.",
    },
    {
      question: "Email Marketing",
      answer:
        "Email Marketing is the practice of sending targeted emails to a group of individuals or subscribers to promote products, services, or engage with the audience. It includes building an email list, designing and sending email campaigns, personalization, automation, and analyzing campaign performance to drive conversions and customer engagement.",
    },
    {
      question: "Pay-Per-Click (PPC) Advertising",
      answer:
        "Pay-Per-Click (PPC) Advertising is a digital advertising model where advertisers pay a fee each time their ad is clicked. It is commonly associated with search engine advertising platforms like Google Ads and Bing Ads. PPC advertising enables businesses to display their ads prominently in search engine results and target specific keywords and demographics.",
    },
    {
      question: "Google Analytics",
      answer:
        "Google Analytics is a web analytics tool provided by Google that tracks and reports website traffic and user behavior. It provides valuable insights into website performance, user engagement, traffic sources, conversion rates, and more. Google Analytics helps businesses make data-driven decisions and optimize their online presence.",
    },
    {
      question: "Conversion Rate Optimization",
      answer:
        "Conversion Rate Optimization (CRO) is the process of increasing the percentage of website visitors who take the desired action, such as making a purchase, filling out a form, or subscribing to a newsletter. It involves analyzing user behavior, conducting A/B testing, optimizing landing pages, and improving the overall user experience to maximize conversions.",
    },
    {
      question: "Online Advertising",
      answer:
        "Online Advertising refers to promoting products, services, or brands through various forms of digital advertising channels. It includes display advertising, video advertising, native advertising, Digital media advertising, and more. Online advertising allows businesses to reach a wide audience and target specific demographics with tailored messaging and creative formats.",
    },
    {
      question: "Marketing Analytics",
      answer:
        "Marketing Analytics involves collecting, measuring, analyzing, and interpreting data related to marketing efforts to evaluate performance, identify trends, and make data-driven decisions. It includes analyzing marketing campaigns, customer behavior, market segmentation, customer lifetime value, and other metrics to optimize marketing strategies and allocate resources effectively.",
    },
  ];
  const CoursePage = () => {
    const subsState = useSubsState();
    const category = usePathname();
    const router = useRouter();

    let selectedArray = [];
    let title;

    if (category === "/course/web-development") {
      selectedArray = WebDevelopment;
      title = "Web Development";
    } else if (category === "/course/coding") {
      selectedArray = Coding;
      title = "Coding Bootstrap";
    } else if (category === "/course/Digital-marketing") {
      selectedArray = DigitalMarketing;
      title = "Digital Marketing";
    }

    if (subsState) {
      return (
        <div className="App">
          <h1>{title}</h1>
          <CourseDropdown questions={selectedArray} />
        </div>
      );
    } else {
      return <Loading />;
    }
  };

  return <CoursePage />;
};
export default MainCourse;
