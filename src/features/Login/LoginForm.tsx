import { useForm, useStore } from "@tanstack/react-form";
import { useLogin } from "api/hooks/useLogin";
import { UserFormSchema } from "./schema";

function LoginForm() {
  const mutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: { onBlur: UserFormSchema },

    onSubmit: props => {
      const formData = props.value;

      mutation.mutate(
        { user: formData },
        {
          onError: error => {
            form.setErrorMap({ onServer: error.message });
          },
        }
      );
    },
  });

  const serverError = useStore(form.store, state => {
    return state.errorMap.onServer;
  }) as string;

  const [isSubmitting, canSubmit] = useStore(form.store, state => {
    return [state.isSubmitting, state.canSubmit];
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <ul className="error-messages">
        <p>{serverError}</p>
      </ul>
      <form.Field name="email">
        {field => {
          return (
            <fieldset className="form-group">
              <label htmlFor={field.name} className="bold">
                email
              </label>
              <input
                id="email"
                className="form-control form-control-lg"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors}
            </fieldset>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {field => {
          return (
            <fieldset className="form-group">
              <label htmlFor={field.name}>password</label>
              <input
                id="password"
                className="form-control form-control-lg"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors}
            </fieldset>
          );
        }}
      </form.Field>

      <button
        type="submit"
        className="btn btn-lg btn-primary pull-xs-right"
        disabled={!canSubmit || form.state.isPristine || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
    </form>
  );
}

export { LoginForm };
