import React from "react"
import {
  DateInput,
  FormSchema,
  GuestsSelect,
  LocationSelect,
  useReactBookingForm,
  BookingForm as BookingFormType,
} from "react-booking-form"
import "flatpickr/dist/themes/dark.css"
import { FaSearch, FaPlus, FaMinus } from "react-icons/fa"
import { cities } from "./cities"
import moment from "moment"
import { navigate } from "gatsby-link"

// This is mocking a call to API that would return location search results
// whenever user types into the location input field.
const searchPlace = async (query) =>
  new Promise((resolve, _reject) => {
    setTimeout(() => resolve(searchCities(query)), 600)
  })

// This is what might happen on the backend in real-life application: it would search for the city and return the results in correct format `{value: string, label: string}`.
const searchCities = (query) =>
  cities.filter((city) =>
    city.label.toLowerCase().includes(query.toLowerCase()),
  )

// This is intended to be loaded into the location input field by default
const defaultLocationOptions = [
  { value: "new-york", label: "New York" },
  { value: "barcelona", label: "Barcelona" },
  { value: "los-angeles", label: "Los Angeles" },
]

const formSchema: FormSchema = {
  location: {
    type: "location",
    focusOnNext: "checkIn",
    options: { defaultLocationOptions, searchPlace },
  },
  checkIn: {
    type: "date",
    focusOnNext: "checkOut",
    options: {
      // These are entirely flatpickr options
      altInput: true,
      altFormat: "M j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      wrap: true,
    },
  },
  checkOut: {
    type: "date",
    focusOnNext: "guests",
    options: {
      // These are entirely flatpickr options
      minDateFrom: "checkIn",
      altInput: true,
      altFormat: "M j, Y",
      dateFormat: "Y-m-d",
      wrap: true,
    },
  },
  guests: {
    type: "peopleCount",
    defaultValue: [
      {
        name: "adults",
        label: "Adults",
        description: "Ages 13+",
        value: 1,
        min: 0,
        max: 10,
      },
      {
        name: "children",
        label: "Children",
        description: "Ages 4-12",
        value: 0,
        min: 0,
        max: 10,
      },
      {
        name: "infants",
        label: "Infants",
        description: "Under 4 years old",
        value: 0,
        min: 0,
        max: 10,
      },
    ],
  },
}

const InputCore = React.forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="appearance-none border rounded-full w-full outline-none focus:outline-none transition pl-4 pr-6 group-hover:border-green-500 focus:border-green-500 cursor-pointer bg-transparent text-white"
  />
))

const InputContainer = ({ children, ...props }) => (
  <div
    className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
    {...props}
  >
    {children}
  </div>
)

const Label = ({ children }) => (
  <div className="text-sm w-full font-bold mb-1 text-white">{children}</div>
)

const GuestButton = ({ children, ...props }) => (
  <button
    className="appearance-none rounded-full p-2 flex items-center justify-center h-full overflow-hidden border border-white text-white hover:text-white hover:bg-green-500 hover:border-transparent transition ease-in-out disabled:opacity-50"
    {...props}
  >
    {children}
  </button>
)

const MenuContainer = React.forwardRef(
  ({ children, style, isOpen, ...props }, ref) => (
    <div
      className={`w-64 border z-10 mt-20 transform transition ease-in-out bg-black bg-opacity-40 rounded-3xl overflow-y-auto overflow-x-hidden backdrop-filter backdrop-blur
			${isOpen ? "opacity-100" : "opacity-0 -translate-y-4 pointer-events-none"}
		`}
      style={{
        ...style,
        maxHeight: "240px",
      }}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  ),
)

const OptionContainer = ({ children, ...props }) => (
  <div
    className="transition ease-in-out relative py-2 px-4 hover:text-green-500 text-white cursor-pointer"
    {...props}
  >
    {children}
  </div>
)

const DatePickerInput = ({ placeholder, inputRef }) => (
  <div className="relative flex group h-10 w-full" ref={inputRef}>
    <InputCore type="input" data-input placeholder={placeholder} />
  </div>
)

const InputComponent = ({ form, name, isLoading, ...props }) => (
  <div className="relative flex group h-10 w-full">
    <InputCore ref={form.refs[name]} {...props} />
  </div>
)

const ControlComponent = ({
  form,
  name,
  placeholder,
  ...props
}: {
  form: BookingFormType
  name: string
  placeholder?: string
}) => {
  const count = form.state[name].totalCount
  return (
    <div className="relative flex group h-10 w-full">
      <div
        className="outline-none focus:outline-none appearance-none border rounded-full w-full outline-none transition pl-4 pr-6 group-hover:border-green-500 focus:border-green-500 cursor-pointer flex items-center"
        ref={form.refs[name]}
        tabIndex={-1}
        {...props}
      >
        <p className="text-white">
          {count ? `${count} guest${count > 1 ? "s" : ""}` : ""}{" "}
        </p>
        <div className="text-gray-400 select-none">
          {count ? "" : placeholder}
        </div>
      </div>
    </div>
  )
}

const OptionComponent = ({
  form,
  name,
  option,
}: {
  form: BookingFormType
  name: string
  option: any
}) => {
  const onPlusClick = () => {
    form.setGuestOptionValue(name, option, option.value + 1)
  }

  const onMinusClick = () => {
    form.setGuestOptionValue(name, option, option.value - 1)
  }

  return (
    <div className="flex justify-between items-center transition ease-in-out relative py-2 px-4">
      <div>
        <p className="font-title font-bold text-sm text-white">
          {option.label}
        </p>
        <p className="text-gray-300 text-sm">{option.description}</p>
      </div>
      <div className="flex justify-center items-center gap-x-2">
        <GuestButton
          onClick={onPlusClick}
          disabled={option.value >= (option.max || 100)}
        >
          <FaPlus className="w-3 h-3" />
        </GuestButton>
        <p className="font-title font-bold text-sm text-white">
          {option.value}
        </p>
        <GuestButton onClick={onMinusClick} disabled={option.value === 0}>
          <FaMinus className="w-3 h-3" />
        </GuestButton>
      </div>
    </div>
  )
}

const DatePicker = (props) => (
  <DateInput className="w-full" inputComponent={DatePickerInput} {...props} />
)

export const BookingForm = () => {
  const form = useReactBookingForm({ formSchema })

  const serializeForm = (form: BookingFormType) => {
    const params = {}

    Object.keys(form.state).forEach((key) => {
      const field = form.state[key]

      let value = ""

      if (field.type === "date") {
        value = moment(field.value[0]).format("DD-MM-YYYY")
      }

      if (field.type === "location") {
        value = field.value.value
      }

      if (field.type === "peopleCount") {
        field.value.forEach((option) => {
          params[`${key}-${option.name}`] = option.value
        })
        return
      }

      params[key] = value
    })

    return new URLSearchParams(params).toString()
  }

  const onClick = () => {
    const searchURL = "/search"
    const formParams = serializeForm(form)
    navigate(`${searchURL}?${formParams}`)
  }

  return (
    <div className="rounded-full border border-white bg-black bg-opacity-30 p-6 flex justify-between backdrop-filter backdrop-blur flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
      <InputContainer>
        <Label>{"Location"}</Label>
        <LocationSelect
          form={form}
          menuContainer={MenuContainer}
          optionContainer={OptionContainer}
          inputComponent={InputComponent}
          name="location"
          inputProps={{ placeholder: "Where are you going?" }}
        />
      </InputContainer>
      <InputContainer>
        <Label>{"Check in"}</Label>
        <DatePicker placeholder="Add date" form={form} name={"checkIn"} />
      </InputContainer>
      <InputContainer>
        <Label>{"Check out"}</Label>
        <DatePicker placeholder="Add date" form={form} name={"checkOut"} />
      </InputContainer>
      <InputContainer>
        <Label>{"Guests"}</Label>
        <GuestsSelect
          form={form}
          menuContainer={MenuContainer}
          optionComponent={OptionComponent}
          controlComponent={ControlComponent}
          controlProps={{ placeholder: "Add guests" }}
          name={"guests"}
        />
      </InputContainer>
      <InputContainer>
        <button
          onClick={onClick}
          className="appearance-none mt-5 border w-full h-10 rounded-full flex justify-center items-center bg-transparent hover:bg-green-500 transition text-white font-bold px-3"
        >
          <FaSearch />
          <div className="ml-2">{"Search"}</div>
        </button>
      </InputContainer>
    </div>
  )
}
