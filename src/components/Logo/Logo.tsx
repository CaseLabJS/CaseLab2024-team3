import { FC, HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLOrSVGElement> { }

export const Logo: FC<LogoProps> = (props) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5ZM12 18.5C15.3137 18.5 18 15.8137 18 12.5C18 9.18629 15.3137 6.5 12 6.5C8.68629 6.5 6 9.18629 6 12.5C6 15.8137 8.68629 18.5 12 18.5Z" fill="currentColor" />
        </svg>

    )
}
