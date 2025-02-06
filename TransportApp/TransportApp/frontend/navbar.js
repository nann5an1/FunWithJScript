
const navBtn = document.getElementById("page-nav");
const sidebarPanel = document.getElementById("sidebar-panel");
const settingBtn = document.getElementById("setting");
const settingPanel = document.getElementById("setting-dropdown");
function toggleNav() {
    const width = getComputedStyle(sidebarPanel).width;
    if(parseInt(width) >= 100)
    {
        sidebarPanel.style.width = "0";
        mainContent.style.marginLeft = "0";
    }
    else
    {
        sidebarPanel.style.width = "12rem";
        mainContent.style.marginLeft = "3rem";
    }
  }
  
// function toggleSetting(){
//     const height = getComputedStyle(settingPanel).height;
//     if(parseInt(height) >= 50)
//         settingPanel.style.height = "0";
//     else
//     settingPanel.style.height = "10vh";
// }

navBtn.addEventListener('click', toggleNav);
// settingBtn.addEventListener('click', toggleSetting);
