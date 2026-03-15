import { useState } from "react"

const FilterCards = ({locations,
  setLocations,
  industries,
  setIndustries,
  salaries,
  setSalaries}) => {




  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Noida", "Pune", "Banglore", "Mumbai"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Devops Engineer"]
    },
    {
      filterType: "Salary",
      array: ["0-3 LPA", "4-6 LPA", "7-12 LPA", "13-20 LPA"]
    }
  ]




  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border w-full max-w-xs">

      <h1 className="text-lg font-semibold text-gray-900 mb-4">
        Filter Jobs
      </h1>

      <hr className="mb-4" />

      {filterData.map((data, index) => (

        <div key={index} className="mb-6">

          <h2 className="font-semibold text-gray-800 mb-2">
            {data.filterType}
          </h2>

          <div className="flex flex-col gap-2">

            {data.array.map((item, idx) => (

              <label key={idx} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                <input
  type="checkbox"
  onChange={() => {

    if (data.filterType === "Location") {
      if (locations.includes(item)) {
        setLocations(locations.filter(l => l !== item))
      } else {
        setLocations([...locations, item])
      }
    }

    if (data.filterType === "Industry") {
      if (industries.includes(item)) {
        setIndustries(industries.filter(i => i !== item))
      } else {
        setIndustries([...industries, item])
      }
    }

    if (data.filterType === "Salary") {
      if (salaries.includes(item)) {
        setSalaries(salaries.filter(s => s !== item))
      } else {
        setSalaries([...salaries, item])
      }
    }

  }}
/>
                {item}
              </label>

            ))}

          </div>

        </div>

      ))}

    </div>
  )
}

export default FilterCards