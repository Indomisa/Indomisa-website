import { ServiceItem } from "../model/service-item";

export const SERVICES: ServiceItem[] = [
    {
        title: 'Web Development',
        description: 'Custom web platforms, dashboards, portals, and internal tools built around your business workflows.',
        icon: '🌐',
        link: '/services/web-development'
    },
    {
        title: 'Software Development',
        description: 'Custom software solutions for customers, staff, field teams, and business operations.',
        icon: '💻',
        link: '/services/software-development'
    },
    {
        title: 'Business Analysis',
        description: 'Identify business needs, define requirements, and design solutions that deliver value to your organization.',
        icon: '⚙️',
        link: '/services/business-analysis'
    },
    // {
    //     title: 'API Integrations',
    //     description: 'Connect your systems, third-party tools, payment gateways, CRMs, ERPs, and reporting platforms.',
    //     icon: '🔗'
    // },
    // {
    //     title: 'Analytics Dashboards',
    //     description: 'Turn your business data into clean, useful dashboards for better decisions and visibility.',
    //     icon: '📊'
    // },
    // {
    //     title: 'Cloud Solutions',
    //     description: 'Deploy reliable, scalable, and secure cloud-based applications with room to grow.',
    //     icon: '☁️'
    // }
];