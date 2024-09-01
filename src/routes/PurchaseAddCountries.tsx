import axios from "axios";
import React, { ChangeEvent } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { URL } from "../Base";
import { toast, ToastContainer, Zoom } from "react-toastify";

const PurchaseAddCountries: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showInput, setShowInput] = React.useState<boolean>(false);
  const [country, setCountry] = React.useState<string>("");
  const [countries, setCountries] = React.useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCountry(inputValue);
  };

  //add
  const addCountry = () => {
    if (country && country.length > 0 && !countries?.includes(country)) {
      setCountries((prevCountry) => [...prevCountry, country]);
      setCountry("");
    } else {
      alert("1 ölkədən yalnız 1 dəfə əlavə edə bilərsiniz və mövcud xana boş ola bilməz.");
    }
  };

  //delete
  const deleteCountry = (countryname: string) => {
    setCountries((prev) => prev.filter((country) => country !== countryname));
  };

  //if clicked enter add countries
  React.useEffect(() => {
    const ifClickEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (country && country.length > 0 && !countries?.includes(country)) {
          setCountries((prevCountry) => [...prevCountry, country]);
          setCountry("");
        } else {
          toast.warn("1 ölkədən yalnız 1 dəfə əlavə edə bilərsiniz və mövcud xana boş ola bilməz.", {
            position: "top-center",
          });
        }
      }
    };

    document.addEventListener("keyup", ifClickEnter);
    return () => document.removeEventListener("keyup", ifClickEnter);
  }, [country, countries]);

  //send countries to DB
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const countriesData = countries.map((country) => ({ country }));
      console.log(countriesData, "bu countriesdatadir!");

      const response = await axios.post(
        `${URL}/purchaseAddCountry`,
        { countries: countriesData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        toast.success("Əla! Ölkələr müvəffəqiyyətlə sayta göndərildi!", {
          position: "top-center",
        });
        setCountries([]);
        setCountry("");
      } else {
        toast.error("Bir server xətası vəya başqa bir problem oldu. Lütfən yenidən yoxlayın və ya adminlərlə görüşün", {
          position: "top-center",
        });
        console.log(response.status);
      }
    } catch (error) {
      toast.error("Bir server xətası vəya başqa bir problem oldu. Lütfən yenidən yoxlayın və ya adminlərlə görüşün", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <div className="purchase-add-countries">
      <ToastContainer transition={Zoom} autoClose={2000} />
      <h3>Satınalma (ƏLAQƏ) formu üçün ölkə əlavə edin</h3>

      <div className={`container-for-countries ${showInput ? "active" : ""}`}>
        <div className="added-countries-basket">
          {countries &&
            countries?.length > 0 &&
            countries?.map((country, i: number) => (
              <div className="country-item" key={i}>
                <span>{country}</span>
                <IoIosCloseCircleOutline className="delete-item" onClick={() => deleteCountry(country)} />
              </div>
            ))}
        </div>
        <div className="input">
          <input
            maxLength={65}
            value={country}
            required
            onChange={handleInputChange}
            type="text"
            placeholder="Ölkə adını yazın.."
          />
          <button onClick={addCountry}>Əlavə et</button>
        </div>
      </div>

      <div className="buttons">
        <button className="add" onClick={() => setShowInput((prev) => !prev)}>
          {showInput ? "Yığ" : "Ölkə əlavə et"}
        </button>
        <button
          disabled={loading}
          id={loading ? "disable-btn" : ""}
          className={`send ${countries?.length > 0 ? "actived" : ""}`}
          onClick={fetchCountries}>
          {loading ? "Ölkələr göndərilir..." : "Emal üçün sayta göndər"}
        </button>
      </div>
    </div>
  );
};

export default PurchaseAddCountries;
