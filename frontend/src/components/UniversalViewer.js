import {useEffect, useLayoutEffect, useRef} from "react";
import "universalviewer/dist/uv.css";
import "universalviewer/dist/esm/index.css";

import {init, IIIFURLAdaptor} from "universalviewer";

export function UV({manifest}) {
    const uvRef = useRef()
    useEffect(() => {
        const initViewer = () => {
            var urlAdapter = new IIIFURLAdaptor();

            const data1 = {
                manifest: "http://localhost:5000/api/manifest/" + manifest,
            };
            const data = {
                manifest: "http://localhost:5000/api/manifest/" + manifest,
                embedded: true, // needed for codesandbox frame
                manifestIndex: Number(urlAdapter.get("m", 0)),
                canvasIndex: Number(urlAdapter.get("cv", 0)),
                rotation: Number(urlAdapter.get("r", 0)),
                rangeId: urlAdapter.get("rid", ""),
                xywh: urlAdapter.get("xywh", ""),
                target: urlAdapter.get("target", "")
            };
            const uv = init(uvRef.current, data);
            urlAdapter.bindTo(uv)
            console.log(data)
        };
        initViewer();
    }, [manifest]);

    return (
        <div
            className="uv"
            id="uv"
            ref={uvRef}
            style={{width: "100%", height: "100%"}}
        />
    );
}