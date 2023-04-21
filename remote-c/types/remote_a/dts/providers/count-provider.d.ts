import React from "react";
export type CountContextType = {
    count: number;
    setCount?: (count: number) => void;
};
export declare const useCountContext: () => CountContextType;
export type CountProviderProps = {
    children: React.ReactNode;
};
declare const CountProvider: ({ children }: CountProviderProps) => JSX.Element;
export default CountProvider;
