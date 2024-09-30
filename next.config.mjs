/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
    },

    i18n: {
        locales: ["ru-RU"],
        defaultLocale: "ru-RU",
    },
};

export default nextConfig;
