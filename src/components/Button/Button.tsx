import styles from 'Button.module.scss';

type ButtonProps = {
    text?: string;
};

export function Button ({text, }: ButtonProps){
    return (
        <button>{text}</button>
    )
}

export function MainButton({text, }: ButtonProps){
    return (
        <button className={styles['main-button']}>{text}</button>
    )
}