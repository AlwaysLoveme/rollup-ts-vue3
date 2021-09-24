import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWord",
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const renderContent = () => {
      return <div>{props.msg}</div>;
    };

    return () => (<>{renderContent()}</>)
  },
});
