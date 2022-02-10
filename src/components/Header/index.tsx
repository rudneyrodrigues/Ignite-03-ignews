import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <div className='headerContent'>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a>Home</a>
          <a>Post</a>
        </nav>
      </div>
    </HeaderContainer>
  )
}