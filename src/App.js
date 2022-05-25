
import { useEffect, useState } from 'react';

///< Selected user address
window.userAddress = null;


///< If the address is not set, hide it
///< Otherwise show the active address in web browser
function showAddress() {
  if (!window.userAddress) {
    document.getElementById("userAddress").innerText = "";
    document.getElementById("hideButton").classList.add("hidden");
    return false;
  }

  document.getElementById(
    "userAddress"
  ).innerText = `Active User Address: ${window.userAddress}`;
  //document.getElementById("hideButton").classList.remove("hidden");
}


///< Login with Web3 via Metamasks window.ethereum library
async function loginWithEth() {
  if (window.web3) {
    try {
      // We use this since ethereum.enable() is deprecated. This method is not
      // available in Web3JS - so we call it directly from metamasks' library
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("No account selected!");
        });
      window.userAddress = selectedAccount;
      window.localStorage.setItem("userAddress", selectedAccount);
      showAddress();
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("No ETH brower extension detected.");
  }
}

function App() {
  const [account, setAccount] = useState(); // state variable to set account.
  




  
   return (
                <div class="flex flex-col space-y-2">
                <button onclick= {loginWithEth()}
                    class="rounded bg-white border border-gray-400 hover:bg-gray-100 py-2 px-4 text-gray-600 hover:text-gray-700">
                    Login  Save ETH Address
                </button>

                <p id="userAddress" class="text-gray-600"></p>
              

                <p id="activeContractAddress-producer" class="text-gray-600"></p>

            </div>
   );
}

export default App;