import styles from './Button.module.scss';

type ButtonProps = {
    children?: React.ReactNode;
    clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Button ({children}: ButtonProps){
    return (
        <button>{children}</button>
    )
}

export function MainButton({children, clickHandler}: ButtonProps){
    return (
        <button 
            className={`${styles['button']} ${styles['main-button']}`}
            onClick={clickHandler}
        >
            {children}
        </button>
    )
}

export function SecondaryButton({children, clickHandler}: ButtonProps){
    return (
        <button 
            className={`${styles['button']} ${styles['secondary-button']}`}
            onClick={clickHandler}
        >
            {children}
        </button>
    )
}