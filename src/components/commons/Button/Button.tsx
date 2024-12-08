import styles from './Button.module.scss';

type ButtonProps = {
    text?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>)=>void
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

export function HamburgerButton({onClick}: ButtonProps){
    return (
        <button className={styles.hamburgerButton} onClick={onClick} type="reset">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#fff' d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </button>   
    )
}