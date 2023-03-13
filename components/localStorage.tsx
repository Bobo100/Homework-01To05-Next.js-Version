import React, { createContext, useContext } from "react";

interface IMyContext {
    useLocalStorage?: <T>(
        key: string,
        fallbackValue: T
    ) => readonly [T, (value: T) => void];
}

const MyContext = createContext<IMyContext>({});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const { Provider } = MyContext;
    return (
        <Provider
            value={{
                useLocalStorage<T>(
                    key: string,
                    fallbackValue: T
                ): readonly [T, (value: T) => void] {
                    // fetches the JSON from local storage if it was there,
                    // or returns undefined if none of the keys match.
                    const maybeStoredValueJson =
                        typeof window !== "undefined" && localStorage.getItem(key);
                    if (maybeStoredValueJson != null) {
                        try {
                            fallbackValue = JSON.parse(maybeStoredValueJson);
                        } catch (e) {
                            console.error(
                                `Could not parse "${maybeStoredValueJson}" in LocalStorage under key "${key}".`
                            );
                        }
                    }

                    const [value, setValue] = React.useState<T>(fallbackValue);
                    React.useEffect(() => {
                        localStorage.setItem(key, JSON.stringify(value));
                    }, [key, value]);

                    return [value, setValue] as const;
                },
            }}
        >
            {children}
        </Provider>
    );
}

export function useMyContext() {
    const ctx = useContext(MyContext);
    if (!ctx) {
        throw new Error(
            "useMyContext must be inside the AppWrapper component's tree"
        );
    }
    return ctx;
}