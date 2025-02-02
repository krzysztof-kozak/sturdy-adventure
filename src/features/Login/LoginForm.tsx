import { useForm } from "@tanstack/react-form";
import { useLogin } from "api/hooks/useLogin";

function LoginForm() {
  const mutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: props => {
      const formData = props.value;
      mutation.mutate({ user: formData });
    },
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
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
              />
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
              />
            </fieldset>
          );
        }}
      </form.Field>

      <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
        Login
      </button>
    </form>
  );
}

export { LoginForm };
