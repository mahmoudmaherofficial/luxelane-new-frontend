import "@/app/styles/dashboard.css";

import {
  BsArrowUpRight,
  BsPerson,
  BsCart3,
  BsGraphUp
}

from "react-icons/bs";

import {
  FiActivity,
  FiDollarSign,
  FiShoppingBag,
  FiBarChart2
}

from "react-icons/fi";

const DashboardPage=()=> {
  return (<div className="px-4 py-6 max-w-7xl mx-auto"> {
      " "
    }

      {
      /* Welcome Header */
    }

    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"> {
      " "
    }

    <div> {
      " "
    }

    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Welcome back, Alex</h1> {
      " "
    }

    <p className="text-gray-500">Here's what's happening with your store today.</p> {
      " "
    }

    </div> {
      " "
    }

    <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"> {
      " "
    }

    <span>View Reports</span> <BsArrowUpRight /> {
      " "
    }

    </button> {
      " "
    }

    </div> {
      " "
    }

      {
      /* Stats Overview */
    }

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {
      " "
    }

      {
      [ {
        title: "Total Revenue",
        value: "$24,780",
        change: "+8.2%",
        isPositive: true,
        icon: <FiDollarSign className="h-6 w-6 text-blue-600"/>,
        bgColor: "bg-blue-100",
      }

      ,
        {
        title: "Total Orders",
        value: "1,482",
        change: "+4.3%",
        isPositive: true,
        icon: <BsCart3 className="h-6 w-6 text-violet-600"/>,
        bgColor: "bg-violet-100",
      }

      ,
        {
        title: "New Customers",
        value: "382",
        change: "+12.1%",
        isPositive: true,
        icon: <BsPerson className="h-6 w-6 text-amber-600"/>,
        bgColor: "bg-amber-100",
      }

      ,
        {
        title: "Conversion Rate",
        value: "3.42%",
        change: "-0.8%",
        isPositive: false,
        icon: <BsGraphUp className="h-6 w-6 text-emerald-600"/>,
        bgColor: "bg-emerald-100",
      }

      ,
      ].map((stat, index)=> (<div key= {
            index
          }

          className="bg-white p-6 rounded-xl shadow-dashboard flex items-start stats-item"

          style= {
              {
              "--item-index": index
            }

            as React.CSSProperties
          }

          > <div className= {
            `rounded-full $ {
              stat.bgColor
            }

            p-3 mr-4`
          }

          > {
            stat.icon
          }

          </div> <div> <p className="text-gray-500 text-sm"> {
            stat.title
          }

          </p> <h3 className="text-2xl font-bold text-slate-800"> {
            stat.value
          }

          </h3> <div className="flex items-center mt-1"> <span className= {
            `$ {
              stat.isPositive ? "text-green-500" : "text-red-500"
            }

            text-sm font-medium flex items-center`
          }

          > <BsArrowUpRight className= {
            `h-3 w-3 mr-1 $ {
               !stat.isPositive ? "rotate-180" : ""
            }

            `
          }

          /> {
            stat.change
          }

          </span> <span className="text-gray-400 text-xs ml-2">vs last month</span> </div> </div> </div>))
    }

      {
      " "
    }

    </div> {
      " "
    }

      {
      /* Activity and Overview Section */
    }

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"> {
      " "
    }

      {
      /* Recent Activity - Takes 2/3 width on large screens */
    }

    <div className="lg:col-span-2 bg-white rounded-xl shadow-dashboard p-6"> {
      " "
    }

    <div className="flex justify-between items-center mb-6"> {
      " "
    }

    <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2> {
      " "
    }

    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"> {
      " "
    }

    View All {
      " "
    }

    </button> {
      " "
    }

    </div> {
      " "
    }

    <div className="space-y-4"> {
      " "
    }

      {
      [1, 2, 3, 4].map((item)=> (<div key= {
            item
          }

          className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"

          style= {
              {
              "--item-index": item
            }

            as React.CSSProperties
          }

          > {
            " "
          }

          <div className= {
            `rounded-full p-2 mr-4 $ {
              item % 2===0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
            }

            `
          }

          > {
            " "
          }

            {
            item % 2===0 ? <FiShoppingBag className="h-5 w-5"/> : <FiActivity className="h-5 w-5"/>
          }

          </div> {
            " "
          }

          <div className="flex-1"> {
            " "
          }

          <p className="font-medium text-slate-800"> {
            " "
          }

            {
            item % 2===0 ? "New order #ORD-" : "Customer login"
          }

            {
            2384 + item
          }

          </p> {
            " "
          }

          <p className="text-gray-500 text-sm"> {
            " "
          }

            {
            item % 2===0 ? "$125.00 - 2 items" : "John Smith from New York"
          }

          </p> {
            " "
          }

          </div> {
            " "
          }

          <span className="text-gray-400 text-sm">12m ago</span> {
            " "
          }

          </div>))
    }

    </div> {
      " "
    }

    </div> {
      " "
    }

      {
      /* Quick Access */
    }

    <div className="bg-white rounded-xl shadow-dashboard p-6"> {
      " "
    }

    <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2> {
      " "
    }

    <div className="grid grid-cols-2 gap-4"> {
      " "
    }

      {
      [ {
        title: "Orders",
        icon: <FiShoppingBag className="h-5 w-5"/>,
        color: "bg-indigo-100 text-indigo-600",
      }

      ,
        {
        title: "Products",
        icon: <BsCart3 className="h-5 w-5"/>,
        color: "bg-pink-100 text-pink-600",
      }

      ,
        {
        title: "Customers",
        icon: <BsPerson className="h-5 w-5"/>,
        color: "bg-amber-100 text-amber-600",
      }

      ,
        {
        title: "Analytics",
        icon: <FiBarChart2 className="h-5 w-5"/>,
        color: "bg-emerald-100 text-emerald-600",
      }

      ,
      ].map((item, index)=> (<div key= {
            index
          }

          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-sm cursor-pointer transition-all duration-300 card-shine"> {
            " "
          }

          <div className= {
            `rounded-full p-3 mb-2 $ {
              item.color
            }

            `
          }

          > {
            " "
          }

            {
            item.icon
          }

          </div> {
            " "
          }

          <span className="font-medium text-slate-800"> {
            item.title
          }

          </span> {
            " "
          }

          </div>))
    }

    </div> {
      " "
    }

    <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white"> {
      " "
    }

    <h3 className="font-semibold mb-1">Premium Features</h3> {
      " "
    }

    <p className="text-sm text-indigo-100 mb-3">Unlock advanced analytics and features</p> {
      " "
    }

    <button className="bg-white text-indigo-600 px-3 py-1 text-sm rounded font-medium hover:bg-indigo-50 transition-colors"> {
      " "
    }

    Upgrade Now {
      " "
    }

    </button> {
      " "
    }

    </div> {
      " "
    }

    </div> {
      " "
    }

    </div> {
      " "
    }

      {
      /* Recently Added Products */
    }

    <div className="bg-white rounded-xl shadow-dashboard p-6"> {
      " "
    }

    <div className="flex justify-between items-center mb-6"> {
      " "
    }

    <h2 className="text-xl font-bold text-slate-800">Recent Products</h2> {
      " "
    }

    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"> {
      " "
    }

    View All Products {
      " "
    }

    </button> {
      " "
    }

    </div> {
      " "
    }

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {
      [ {
        name: "Premium Watch", category: "Accessories", price: 45, color: "from-blue-500 to-indigo-600"
      }

      ,
        {
        name: "Leather Bag", category: "Fashion", price: 55, color: "from-purple-500 to-pink-600"
      }

      ,
        {
        name: "Smart Speaker", category: "Electronics", price: 65, color: "from-amber-400 to-orange-600"
      }

      ,
        {
        name: "Wireless Earbuds", category: "Audio", price: 75, color: "from-emerald-500 to-green-600"
      }

      ,
      ].map((product, item)=> (<div key= {
            item
          }

          className="hover-lift border border-gray-100 rounded-lg overflow-hidden group card-shine"

          style= {
              {
              "--item-index": item
            }

            as React.CSSProperties
          }

          > <div className= {
            `h-40 bg-gradient-to-r $ {
              product.color
            }

            flex items-center justify-center p-4`
          }

          > <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"> <BsCart3 className="h-8 w-8 text-white"/> </div> </div> <div className="p-4"> <div className="flex justify-between items-start"> <div> <h3 className="font-medium text-slate-800"> {
            product.name
          }

          </h3> <p className="text-gray-500 text-sm"> {
            product.category
          }

          </p> </div> <span className="font-bold text-indigo-600">$ {
            product.price
          }

          .00</span> </div> <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between"> <span className="text-sm text-gray-500">Stock: 25</span> <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"> Edit </button> </div> </div> </div>))
    }

    </div> {
      " "
    }

    </div> {
      " "
    }

    </div>);
}

;
export default DashboardPage;