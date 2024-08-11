"use client";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ListModelData } from "@/components/models/listModelData";
import { CreateOrderField } from "@/components/models/order/Create";
import { EditOrderField } from "@/components/models/order/Edit";
import { ListOrderData } from "@/components/models/order/List";
import { ViewOrderField } from "@/components/models/order/View";
import { ViewField } from "@/components/models/viewField";
import { allModels } from "@/lib/schemas";

// export function generateMetadata({ params }: any): any {
//   const dynamicParamaters = params.fields;
//   const model = dynamicParamaters[0];
//   return {
//     title: model.toUpperCase(),
//   };
// }

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParamaters = params.fields;
  // console.log({dynamicParamaters});
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];
  console.log({ searchParams });

  const deletefieldKey = searchParams?.deletekey;

  if (fieldId && !["edit", "delete"].includes(action)) {
    return (
      <div>
        {action === "view" && model === "order" ? (
          <ViewOrderField modelSlug={model} id={fieldId} />
        ) : (
          <ViewField modelSlug={model} id={fieldId} />
        )}
      </div>
    );
  } else if (action) {
    return (
      <div>
        {action === "create" && model === "order" && (
          <CreateOrderField
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        )}
        {action === "create" && model !== "order" && (
          <CreateField
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        )}
        {action === "edit" && model !== "order" && (
          <EditField
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
          />
        )}
        {action === "edit" && model === "order" && (
          <EditOrderField
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
          />
        )}
        {action === "delete" && (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        )}
      </div>
    );
  } else if (model) {
    return (
      <div>
        {model === "product" && <ListModelData modelSlug={model} />}
        {model === "order" && <ListOrderData modelSlug={model} />}
      </div>
    );
  }
};

export default DynamicPage;
