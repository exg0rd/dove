"use server";

import { comforta } from "@/app/layout";
import { cn } from "@/app/lib/utils";

export const HomeContent: React.FC = () => {
    return (
        <div className={cn(comforta.className, "container mx-auto mt-10 px-4 py-12")}>
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center">
                <div className="w-full lg:w-1/2 sm:px-4 lg:pl-8">
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-pink-900 mb-4">
                        ИДЕАЛЬНЫЙ ПЛАНИРОВЩИК ДЛЯ ВАС
                    </h2>
                    <p className="text-md md:text-lg leading-loose text-pink-800 mb-6 text-balance">
                        Наша платформа создана специально для тех, кто стремится
                        к максимальной продуктивности и эффективности в работе.
                        Мы предлагаем удобный инструмент для управления
                        проектами, контроля выполнения задач и отслеживания
                        прогресса. С нами Вы сможете забыть о хаосе в делах и
                        сконцентрироваться на главном.
                    </p>
                    <p className="mt-3 text-sm text-pink-600 font-light">
                        *Подойдет для работы, учёбы и личной жизни!
                    </p>
                </div>
                <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 hidden lg:flex rounded-full items-center">
                    <img
                        src="/images/home.jpg"
                        alt="Example Image"
                        className="object-contain"></img>
                </div>
            </div>
        </div>
    );
};
