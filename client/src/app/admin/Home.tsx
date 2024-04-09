// // src/Home.tsx

// import React, { useEffect } from "react";
// import ApexCharts from "apexcharts";

// const Home: React.FC = () => {
//   const data = {
//     isSideMenuOpen: false,
//     toggleSideMenu() {
//       this.isSideMenuOpen = !this.isSideMenuOpen;
//     },
//     closeSideMenu() {
//       this.isSideMenuOpen = false;
//     },
//     isNotificationsMenuOpen: false,
//     toggleNotificationsMenu() {
//       this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
//     },
//     closeNotificationsMenu() {
//       this.isNotificationsMenuOpen = false;
//     },
//     isProfileMenuOpen: false,
//     toggleProfileMenu() {
//       this.isProfileMenuOpen = !this.isProfileMenuOpen;
//     },
//     closeProfileMenu() {
//       this.isProfileMenuOpen = false;
//     },
//     isPagesMenuOpen: false,
//     togglePagesMenu() {
//       this.isPagesMenuOpen = !this.isPagesMenuOpen;
//     },
//   };

//   useEffect(() => {
//     // Chartline
//     const chartline = document.querySelector("#chartline");
//     const optionsLine = {
//       // ... (options tương tự trong mã JS của bạn)
//     };
//     const chartLine = new ApexCharts(chartline, optionsLine);
//     chartLine.render();

//     // Chartpie
//     const chartpie = document.querySelector("#chartpie");
//     const optionsPie = {
//       // ... (options tương tự trong mã JS của bạn)
//     };
//     const chartPie = new ApexCharts(chartpie, optionsPie);
//     chartPie.render();
//   }, []);

//   return (
//     <main className="">
//       <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
//         {/* Your existing JSX code */}
//       </div>
//     </main>
//   );
// };

// export default Home;
