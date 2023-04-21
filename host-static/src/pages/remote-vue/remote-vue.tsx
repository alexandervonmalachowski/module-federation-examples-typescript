import React, { useEffect, useRef, useState } from "react";
import { mount } from "remote_vue/vue_bootstrap";

const RemoteVue = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current && !loaded) {
      mount(ref.current);
      setLoaded(true);
    }
  }, [loaded]);

  return <div id="remote-vue" ref={ref} />;
};

export default RemoteVue;
