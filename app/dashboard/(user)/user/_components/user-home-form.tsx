"use client";

import { useState, useEffect, KeyboardEvent, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AddressSuggestion, Coordinates } from "@/types/point-types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { setUserHomeAddress } from "@/actions/set-home-address";
import { useHomeAddressModal } from "@/store/use-rename-modal";
import { HomeAdressResponse } from "@/types/req-res-types";

interface UserHomeFormProps {
  userId: number;
  userAddress?: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Address is required",
  }),
});

export function UserHomeForm({ userId, userAddress }: UserHomeFormProps) {
  const [address, setAddress] = useState<string>(userAddress ?? "");
  // const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [addressSelected, setAddressSelected] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { setAddressSet } = useHomeAddressModal();

  // Initialize provider as null
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    // Dynamically import leaflet-geosearch only on the client side
    import("leaflet-geosearch").then((module) => {
      const OpenStreetMapProvider = module.OpenStreetMapProvider;
      setProvider(new OpenStreetMapProvider());
    });
  }, []);

  useEffect(() => {
    if (!addressSelected) {
      // Debounce the handleSearch function
      const debounceSearch = setTimeout(() => {
        handleSearch();
      }, 500);

      // Clear the timeout on component unmount or when address changes
      return () => clearTimeout(debounceSearch);
    }
    setAddressSelected(false);
  }, [address]);

  const handleSearch = async () => {
    if (address.length === 0) {
      setSuggestions([]);
      setCoordinates(null);
      return;
    }
    if (address.length > 2 && provider) {
      const results = await provider.search({ query: address });
      setSuggestions(results);
      setHighlightedIndex(null); // Reset highlighted index when suggestions change
    } else {
      setSuggestions([]);
      setHighlightedIndex(null);
    }
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    const { x, y, label } = suggestion;
    // setCoordinates([y, x]);
    setCoordinates({ y: y, x: x });
    setAddress(label);
    setSuggestions([]);
    setHighlightedIndex(null);
    setAddressSelected(true);
    form.setValue("name", label);
    form.trigger("name");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex !== null && prevIndex > 0
          ? prevIndex - 1
          : suggestions.length - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex !== null && prevIndex < suggestions.length - 1
          ? prevIndex + 1
          : 0
      );
    } else if (event.key === "Enter" && highlightedIndex !== null) {
      event.preventDefault();
      handleSelectSuggestion(suggestions[highlightedIndex]);
      setSuggestions([]);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: address,
    },
  });

  useEffect(() => {
    form.setValue("name", address);

    // to prohibit the form validation to trigger on initial mount
    if (address.length > 0) {
      form.trigger("name");
    }
  }, [address]);

  const handleSetHomeAddress = async (
    userId: number,
    homeData: HomeAdressResponse
  ) => {
    0;
    startTransition(async () => {
      try {
        const data = await setUserHomeAddress(userId, homeData);
        if (data?.success) {
          toast.success(data.success);
          setAddressSet(true); // Update Zustand store
        } else if (data?.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!coordinates) {
        toast.info(`Please select address from the suggestions`);
        throw new Error("No coords found !!");
      }

      const homeData = {
        address: data.name,
        latitude: coordinates.y,
        longitude: coordinates.x,
      };
      await handleSetHomeAddress(userId, homeData);
    } catch (error: any) {
      toast.error(`${error.message}`);
      console.error(`${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4 relative">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    // value={address}
                    placeholder="Enter your home address"
                    type="text"
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value === "" && e.target.value.length < 1) {
                        setAddress("");
                        setCoordinates(null);
                        setSuggestions([]);
                        setAddressSelected(false);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full mt-1 z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion.x}
                        className={`p-2 cursor-pointer hover:bg-gray-200 ${
                          index === highlightedIndex ? "bg-gray-200" : ""
                        }`}
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion.label}
                      </li>
                    ))}
                  </ul>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
