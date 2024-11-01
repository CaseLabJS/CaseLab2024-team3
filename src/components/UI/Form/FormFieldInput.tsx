import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "."
import { Input, InputProps } from ".."
import { LabelProps } from "@radix-ui/react-label"
import { UseControllerProps } from "react-hook-form"
import { cn } from "src/lib"
import { AssignComponent } from "src/types/assignComponent"



interface FormFieldInput extends Omit<InputProps, "defaultValue">, UseControllerProps {
    name: string
    description?: string
    label?: string
    labelProps?: LabelProps
    descriptionProps?: React.HTMLAttributes<HTMLParagraphElement>
    messageProps?: React.HTMLAttributes<HTMLParagraphElement>
}

export const FormFieldInput: AssignComponent<"input", FormFieldInput>
    = ({
        as = Input,
        label,
        description,
        name,
        defaultValue = "",
        disabled,
        rules,
        shouldUnregister,
        labelProps,
        descriptionProps,
        messageProps,
        ...inputProps
    }) => {
        const form = useFormField()
        const Comp = as
        return (
            <FormField
                control={form.control}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                rules={rules}
                shouldUnregister={shouldUnregister}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel {...labelProps} className={cn("text-indigo-700", labelProps?.className)}>{label}</FormLabel>
                        <FormControl>
                            <Comp {...inputProps} {...field} />
                        </FormControl>
                        <FormDescription {...descriptionProps}>
                            {description}
                        </FormDescription>
                        <FormMessage {...messageProps} />
                    </FormItem>
                )}
            />
        )
    }
