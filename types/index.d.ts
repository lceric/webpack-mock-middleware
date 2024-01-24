type SetupMiddlewares = []
type MiddlewaresFunc = (middlewares: SetupMiddlewares, devServer, options: { mock, prefix }) => middlewares

interface Options {
  /**
   * mock mode
   * @description Mock mode can be enabled by default using the `npm run dev --mock` command
   * @default process.env.npm_config_mock
   */
  mock?: boolean,

  /**
   * Mock dir
   * @default path.join(process.cwd(), './mock')
   * @example
   * ```js
   * {
   *  mockDir: path.join(__dirname, './custom-mock')
   * }
   * ```
   */
  mockDir?: string,
  
  /**
   * Customize mock prefix path, Keep consistent with `express` routing
   * @default '/mock/*'
   * @example
   * ```js
   * {
   *  prefix: '/mock1/*'
   * }
   * 
   * // mock1/list.js
   * fetch('/mock1/list')
   * ```
   */
  prefix?: string,

  /**
   * same as webpack devServer `setupMiddlewares`
   * @description use array will push to `middlewares`, use function will same as webpack `devServer.setupMiddlewares`
   */
  middlewares?: SetupMiddlewares[] | MiddlewaresFunc,

  /**
   * Multiple mock prefixes and directory configuration
   */
  multiple?: {
    mockDir: string,
    prefix: string,
  }[]
}
type WebpackSetupMiddlewares = (middlewares: SetupMiddlewares, devServer) => middlewares
export default (options: Options) => WebpackSetupMiddlewares