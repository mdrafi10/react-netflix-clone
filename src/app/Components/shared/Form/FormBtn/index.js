import { useFormikContext } from "formik";
import Button from "../../Button";

function FormBtn({ title, loading = false }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      loading={loading}
      onClick={handleSubmit}
      className="text-white mr-5 py-[12px] rounded px-5 bg-[#e50914] border-none w-full mt-6 text-lg font-semibold"
      type="button"
    >
      {title}
    </button>
  );
}

export default FormBtn;
