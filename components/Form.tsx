import { TextField, Checkbox } from "@dfds-ui/forms";
import { Button, ButtonStack } from "@dfds-ui/react-components"
import { SelectField } from "@dfds-ui/forms/select-field/SelectField";
import { useForm, Controller } from "react-hook-form";

const defaultValues: {
  input?: string | undefined;
  checkbox?: string | undefined;
  gender?: string | undefined;
  nativeselect?: string | undefined;
  city?: string | undefined;
} = {
  input: "",
  checkbox: "",
  gender: "",
  nativeselect: "",
  city: "",
};

const Form = () => {
  const { handleSubmit, reset, control, register } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: any) => console.log(data);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>


        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Gender"
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
              ]}
              {...field}
            />
          )}
        />

        <Checkbox {...register("checkbox")}>Checkbox</Checkbox>


        <TextField {...register("input")} />
        <ButtonStack>
          <Button
            variation="secondary"
            type="button"
            onClick={() => reset({ ...defaultValues })}
          >
            Reset
          </Button>
          <Button type="submit">Save</Button>
        </ButtonStack>
      </form>

  );
};

export default Form;
