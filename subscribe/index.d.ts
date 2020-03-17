import { Component, Context } from 'react'

import { Channel } from '../use-subscription'

interface subscriber<Props> {
  (props: Props): Channel[]
}

interface Wrapper {
  (component: Component): Component
}

type SubscribeOptions = {
  /**
   * Context with the store.
   */
  context?: Context<object>

  /**
   * Change default `isSubscribing` property.
   */
  subscribingProp?: string
}

/**
 * Decorator to add subscribe action on component mount and unsubscribe
 * on unmount.
 *
 * ```js
 * import subscribe from '@logux/redux'
 * class User extends React.Component { … }
 * export default subscribe(({ id }) => `user/${ id }`)(User)
 * ```
 *
 * ```js
 * import subscribe from '@logux/redux'
 * class User extends React.Component { … }
 * const SubscribeUser = subscribe(props => {
 *   return { channel: `user/${ props.id }`, fields: ['name'] }
 * })(User)
 * ```
 *
 * @param subscriber Callback to return subscribe action properties according
 *                   to component props.
 * @param opts Options.
 *
 * @return Class wrapper.
 */
export function subscribe<Props = object>(
  subscriber: subscriber<Props>,
  opts?: SubscribeOptions
): Wrapper