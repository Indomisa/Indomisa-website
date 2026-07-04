import { FeaturedWorkModel } from "../model/featured-work.model";

export const FEATURED_WORK_CONFIG: FeaturedWorkModel[] = [
    {
        category: 'Field Service',
        title: 'TechDispatch Platform',
        description:
            'A field service management platform for incident intake, technician dispatch, job tracking, and reporting.',
        link: '/services/software-development',
    },
    {
        category: 'Business Systems',
        title: 'Custom Workflow Automation',
        description:
            'Automation tools that reduce manual admin work, centralise information, and improve operational visibility.',
        link: '/services/business-analysis',
    },
    {
        category: 'Web Applications',
        title: 'Client-Facing Portals',
        description:
            'Secure web portals for customer communication, service requests, dashboards, and document management.',
        link: '/services/web-development',
    },
];