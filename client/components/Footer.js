export default ({ solid }) => (
  <footer data-solid={solid}>
    <p>
      Want to learn how to build DApps like this?
    </p>
    <p>
      Check out my online course <a href="https://www.ludu.co/course/ethereum" target="_blank">
        Discover Ethereum & Solidity
      </a>
    </p>

    <style jsx>{`
      footer {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        width: 600px;
        background-color: #00000040;
        border-radius: 4px;
        padding: 8px 27px;
        box-shadow: inset 0px 1px 2px #00000017;
        line-height: 26px;
        bottom: 16px;
      }
      footer a {
        color: #79cdff;
        text-decoration: none;
      }
      footer a:hover {
        text-decoration: underline;
      }

      footer[data-solid="true"] {
        background: none;
        box-shadow: none;
        border-top: 1px solid #0000001f;
        border-radius: 0;
        color: #8b8b95;
        text-shadow: 0 -1px 0px #ffffff47;
        position: static;
        transform: none;
        margin: 20px auto;
      }
      footer[data-solid="true"] a {
        color: #897bff;
        text-decoration: none;
      }

      @media (max-height: 500px) {
        footer {
          display: none;
        }
      }
    `}</style>
  </footer>
)
