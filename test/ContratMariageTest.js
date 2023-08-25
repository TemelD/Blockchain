const ContratMariage = artifacts.require("ContratMariage");

contract("ContratMariage", (accounts) => {
  const spouse1 = accounts[0];
  const spouse2 = accounts[1];

  it("should create a marriage", async () => {
    const marriageInstance = await ContratMariage.new(spouse2);
    await marriageInstance.createMarriage();
    const isMarried = await marriageInstance.getMarriageStatus();
    assert.isTrue(isMarried);
  });

  it("should divorce", async () => {
    const marriageInstance = await ContratMariage.new(spouse2);
    await marriageInstance.createMarriage();
    await marriageInstance.divorce();
    const isMarried = await marriageInstance.getMarriageStatus();
    assert.isFalse(isMarried);
  });
});