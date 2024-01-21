import styles from './Button.module.scss';

type ButtonProps = {
    children?: React.ReactNode;
};

export function Button ({children}: ButtonProps){
    return (
        <button>{children}</button>
    )
}

export function MainButton({children}: ButtonProps){
    return (
        <button className={`${styles['button']} ${styles['main-button']}`}>{children}</button>
    )
}

export function SecondaryButton({children}: ButtonProps){
    return (
        <button className={`${styles['button']} ${styles['secondary-button']}`}>{children}</button>
    )
}