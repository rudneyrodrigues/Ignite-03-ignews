import { SignInButton } from '../SignInButton';

import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <div className="headerContent">
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a className="active">Home</a>
          <a>Post</a>
        </nav>

        <SignInButton />
      </div>
    </HeaderContainer>
  )
}