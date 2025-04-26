// 我们在这里导入Chai以使用它的断言函数
const { expect } = require("chai");

// `describe` 是一个Mocha函数，它允许您组织测试
// 实际上并不需要这样做，但是组织测试会使调试变得更容易。所有的Mocha函数都可以在全局作用域中使用

// `describe` 参数为一个测试名称和一个回调函数
// 回调必须定义该部分的测试。这个回调函数不能是一个异步函数
describe("Token contract", function () {
  // Mocha 有四个函数可以让你能在整个测试生命周期中进行不同的操作，
  // 它们是： `before`, `beforeEach`, `after`, `afterEach`

  // 它们在设置测试环境和运行后清理环境方面非常有用

  // 一个常见的模式是声明一些变量，并在 `before` 和 `beforeEach` 回调中分配它们

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` 将在每次测试之前运行，每次重新部署合约。它接收回调，可以是异步的
  beforeEach(async function () {
    // 在这里获取 ContractFactory 和签名者
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // 要部署我们的合约，只需调用 Token.deploy() 并等待它被 deployed()，一旦它的交易被挖掘，就会发生部署
    hardhatToken = await Token.deploy();
  });

  // 你可以嵌套 describe 调用来创建小结
  describe("Deployment", function () {
    // `it` 是 MoCha 函数，这是用来定义测试的工具。它接收测试名和回调函数

    // 如果回调函数是一步的，Mocha 将 `await`
    it("Should set the right owner", async function () {
      // Expect 接收一个值，并将其包装在Assertion对象中。这些对象有很多实用方法来断言值

      // 这个测试期望存储在合约中的所有者变量等于我们部署合约时候的所有者
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // 将50个代币从所有者转移到 addr1
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // 将50个代币从 addr1 转移到 addr2
      // 我们使用.connect(签名者)从另一个帐户发送交易
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // 尝试从 addr1 (0 代币)发送1个代表给所有者(1000000 代币)。
      // `require`将计算为 false 并恢复交易
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // 所有者余额不应该改变
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // 将100个代币从所有者转移到 addr1
      await hardhatToken.transfer(addr1.address, 100);

      // 将另外50个代币从所有者转移到addr2
      await hardhatToken.transfer(addr2.address, 50);

      // 检查余额
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
