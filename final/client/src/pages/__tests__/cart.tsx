import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import {shallow} from "enzyme";

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    const { getByTestId } = renderApollo(<Cart />, { cache });
    return waitForElement(() => getByTestId('empty-message'));
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const { getByTestId, getByText } = renderApollo(<Cart />, { cache, mocks });
    cartItemsVar(['1']);
    expect(getByText('My Cart')).toBeTruthy();
    return waitForElement(() => getByTestId('book-button'));
  });
});
