import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {type AmplienceMenuItem} from './amplience/navigation/AmplienceNavigation';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: boolean;
  standaloneMode: boolean;
  amplienceMenu: AmplienceMenuItem[];
};

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  standaloneMode,
  amplienceMenu,
}: LayoutProps) {
  return (
    <>
      {standaloneMode ? (
        <main>{children}</main>
      ) : (
        <>
          <CartAside cart={cart} />
          <SearchAside />
          <MobileMenuAside menu={header.menu} shop={header.shop} />
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            amplienceMenu={amplienceMenu}
          />
          <main>{children}</main>
          <Suspense>
            <Await resolve={footer}>
              {(footer) => <Footer menu={footer.menu} shop={header.shop} />}
            </Await>
          </Suspense>
        </>
      )}
    </>
  );
}

function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  menu,
  shop,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu
        menu={menu}
        viewport="mobile"
        primaryDomainUrl={shop.primaryDomain.url}
      />
    </Aside>
  );
}
